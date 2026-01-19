#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');
const { execSync } = require('child_process');
const kleur = require('kleur');

console.log(kleur.magenta().bold(`
  ███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗
  ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔═══██╗██║    ██║
  ███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║
  ╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║
  ███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝
      🌑 GRAVITY PROTOCOL INITIATED...
`));

async function init() {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Name your Shadow extraction:',
      initial: 'my-shadow-app'
    },
    {
      type: 'select',
      name: 'powerLevel',
      message: 'Select Constraint Level:',
      choices: [
        { title: 'S-Rank (Strict TDD / No Hallucinations)', value: 's-rank' },
        { title: 'E-Rank (Standard)', value: 'e-rank' }
      ]
    }
  ]);

  if (!response.projectName) {
      console.log(kleur.red('❌ Operation Cancelled.'));
      return;
  }

  const targetDir = path.join(process.cwd(), response.projectName);
  const templateDir = path.join(__dirname, '../template');

  if (fs.existsSync(targetDir)) {
    console.log(kleur.red(`❌ Error: ${response.projectName} already exists.`));
    process.exit(1);
  }

  // Copy Template
  console.log(kleur.cyan(`\n📦 Extracting Shadow Artifacts to ${response.projectName}...`));
  fs.copySync(templateDir, targetDir);

  // Inject "Shadow Gravity" Rules
  if (response.powerLevel === 's-rank') {
    const missionFile = path.join(targetDir, '.antigravity/MISSION.md');
    fs.appendFileSync(missionFile, `\n\n## 🌑 SHADOW GRAVITY: S-RANK RESTRICTIONS\n1. You are FORBIDDEN from committing without tests.\n2. Any "TODO" comments will cause the Shadow to reject the build.\n3. The "Dungeon Key" (verify-compliance.js) must pass before handover.\n`);
    
    // Enable stricter checks in verify-compliance if needed
    // For now the base verify-compliance is already strict enough
  }

  // Initialize Git (Optional but good for Open Source readiness)
  try {
      execSync(`git init ${targetDir}`, { stdio: 'ignore' });
      // Create a .gitignore in the target if it doesn't exist (it should be in template)
  } catch (e) {
      // access specific error if needed
  }

  // Install
  console.log(kleur.cyan('\nYour Shadow Soldiers are installing dependencies...'));
  try {
    execSync(`cd ${response.projectName} && npm install`, { stdio: 'inherit' });
  } catch(e) {
      console.log(kleur.yellow('⚠️ npm install had some issues, but the dungeon is ready.'));
  }

  console.log(kleur.green(`\n✅ EXTRACTION COMPLETE.`));
  console.log(`\nTo arise your agent:\n  cd ${response.projectName}\n  npm run arise`);
}

init();
