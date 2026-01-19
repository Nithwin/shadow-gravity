#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const kleur = require('kleur');

const { getProjectConfig } = require('../lib/prompts');
const { scaffoldFramework, ensureTool } = require('../lib/scaffold');
const { injectShadow } = require('../lib/shadow');

console.log(kleur.magenta().bold(`
  ███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗
  ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║    ██║
  ███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║
  ╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║
  ███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝
      🌑 GRAVITY PROTOCOL v5.0 (MODULAR)
`));

async function init() {
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
  if (config.needsBackend) {
      console.log(kleur.cyan(`\n🏗️  Scaffolding MONOREPO...`));
      
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
      console.log(kleur.cyan(`\n🏗️  Scaffolding Project...`));
      scaffoldFramework(config.stack, rootDir, config.projectName);
      injectShadow(rootDir, config.stack, 'standalone');
  }

  console.log(kleur.green(`\n✅ EXTRACTION COMPLETE.`));
  console.log(`\nTo arise your agent:\n  cd ${config.projectName}\n  npm run arise`);
}

init();
