#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import kleur from 'kleur';
import ora from 'ora';

import { getProjectConfig } from '../lib/prompts.js';
import { scaffoldFramework, ensureTool } from '../lib/scaffold.js';
import { injectShadow } from '../lib/shadow.js';
import { runDoctor } from '../lib/doctor.js';

console.log(kleur.magenta().bold(`
  ███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗
  ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║    ██║
  ███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║
  ╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║
  ███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝
      🌑 GRAVITY PROTOCOL v2.1
`));

async function init() {
  const args = process.argv.slice(2);
  
  if (args.includes('doctor') || args.includes('--doctor')) {
      try {
          await runDoctor();
          process.exit(0);
      } catch (e) {
          console.error(kleur.red(`\n❌ Doctor failed: ${e.message}`));
          process.exit(1);
      }
  }

  // 1. GET CONFIG
  const config = await getProjectConfig();
  const rootDir = path.join(process.cwd(), config.projectName);
  
  if (fs.existsSync(rootDir)) {
      console.log(kleur.red(`❌ Error: ${config.projectName} already exists.`));
      process.exit(1);
  }
  fs.ensureDirSync(rootDir);

  // 2. TOOL CHECK
  if (config.stack === 'flutter') ensureTool('flutter');
  if (config.backendStack && config.backendStack.includes('node')) ensureTool('node');

  // 3. EXECUTION
  const spinner = ora('Initializing Shadow Gravity...').start();
  
  try {
      if (config.needsBackend) {
          spinner.text = 'Scaffolding Monorepo Structure...';
          
          // A. Mobile
          const mobileDir = path.join(rootDir, 'mobile');
          scaffoldFramework(config.stack, mobileDir, 'mobile-app');
          injectShadow(mobileDir, config.stack, 'mobile');

          // B. Backend
          const backendDir = path.join(rootDir, 'backend');
          scaffoldFramework(config.backendStack, backendDir, 'backend-api');
          injectShadow(backendDir, config.backendStack, 'backend');

          // C. Root Control
          fs.writeJsonSync(path.join(rootDir, 'package.json'), {
              name: config.projectName,
              private: true,
              workspaces: ["mobile", "backend"],
              scripts: {
                  "arise": "concurrently \"npm run arise:mobile\" \"npm run arise:backend\"",
                  "arise:mobile": "cd mobile && npm run arise",
                  "arise:backend": "cd backend && npm run arise"
              },
              devDependencies: {
                  "concurrently": "^8.2.0"
              }
          }, { spaces: 2 });

      } else {
          // Single Repo
          spinner.text = 'Scaffolding Project...';
          scaffoldFramework(config.stack, rootDir, config.projectName);
          injectShadow(rootDir, config.stack, 'standalone');
      }

      spinner.succeed(kleur.green(`Project successfully created.`));
      console.log(`\nNext steps:\n  cd ${config.projectName}\n  npm run arise`);

  } catch (error) {
      spinner.fail(kleur.red('Scaffolding failed.'));
      console.error(error);
  }
}

init();
