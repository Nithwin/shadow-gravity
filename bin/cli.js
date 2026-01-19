#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');
const { execSync } = require('child_process');
const kleur = require('kleur');

console.log(kleur.magenta().bold(`
  ███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗
  ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║    ██║
  ███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║
  ╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║
  ███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝
      🌑 GRAVITY PROTOCOL v3.0 (ARCHITECT)
`));

async function init() {
  let config = {};

  // 1. Project Name (The Initiation)
  const nameRes = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is the name of your new universe?',
    initial: 'shadow-app'
  });
  if (!nameRes.projectName) return console.log(kleur.red('❌ Cancelled.'));
  config.projectName = nameRes.projectName;

  // 2. The Domain (The Battlefield)
  const domainRes = await prompts({
    type: 'select',
    name: 'domain',
    message: 'Choose your domain:',
    choices: [
      { title: '🕸️ Web Application', value: 'web' },
      { title: '📱 Mobile Application', value: 'mobile' },
      { title: '🛠️ Custom Application', value: 'custom' }
    ]
  });
  config.domain = domainRes.domain;

  // 3. The Stack (The Weapon)
  if (config.domain === 'web') {
    const webRes = await prompts({
      type: 'select',
      name: 'stack',
      message: 'Select your Web Architecture:',
      choices: [
        { title: 'Next.js (Frontend) + Node.js (Backend)', value: 'next_node' },
        { title: 'React (Frontend) + Node.js (Backend)', value: 'react_node' },
        { title: 'Next.js (Fullstack - App Router)', value: 'next_full' },
        { title: 'Custom Web Stack', value: 'web_custom' }
      ]
    });
    config.stack = webRes.stack;
  } else if (config.domain === 'mobile') {
    const mobileRes = await prompts({
      type: 'select',
      name: 'stack',
      message: 'Select your Mobile Ops:',
      choices: [
        { title: 'React Native (Expo)', value: 'expo' },
        { title: 'Flutter', value: 'flutter' },
        { title: 'Custom Mobile Stack', value: 'mobile_custom' }
      ]
    });
    config.stack = mobileRes.stack;
  } else {
    config.stack = 'custom_generic';
  }

  // 4. Deep Customization (The Reinforcements)
  const isCustom = config.stack.includes('custom') || config.domain === 'custom';
  
  if (isCustom) {
      console.log(kleur.cyan("\n🛠️  Initializing Deep Research Protocol..."));
      const customRes = await prompts([
          {
              type: 'text',
              name: 'customStackDescription',
              message: 'Describe your perfect stack (e.g., "SvelteKit + Rust"):',
              initial: 'My Custom Stack'
          },
          {
              type: 'multiselect',
              name: 'features',
              message: 'Inject Module Constraints:',
              choices: [
                  { title: 'Docker', value: 'docker' },
                  { title: 'CI/CD (GitHub)', value: 'ci' },
                  { title: 'TypeScript', value: 'ts' },
                  { title: 'Testing (Jest/Vitest)', value: 'test' }
              ]
          }
      ]);
      config.customDescription = customRes.customStackDescription;
      config.features = customRes.features;
  } else {
      // Auto-assign features based on stack type
      config.features = getFeaturesForStack(config.stack);
  }

  // --- EXECUTION ---
  const targetDir = path.join(process.cwd(), config.projectName);
  const templateDir = path.join(__dirname, '../template');

  if (fs.existsSync(targetDir)) {
    console.log(kleur.red(`❌ Error: ${config.projectName} already exists.`));
    process.exit(1);
  }

  console.log(kleur.cyan(`\n📦 Architecting ${config.projectName}...`));
  fs.copySync(templateDir, targetDir);

  // Generate Mission
  const missionContent = generateMission(config);
  fs.writeFileSync(path.join(targetDir, '.antigravity/MISSION.md'), missionContent);

  // Git & Install
  try { execSync(`git init ${targetDir}`, { stdio: 'ignore' }); } catch (e) {}

  console.log(kleur.cyan('\nYour Shadow Soldiers are installing base dependencies...'));
  try { execSync(`cd ${config.projectName} && npm install`, { stdio: 'inherit' }); } catch(e) {}

  console.log(kleur.green(`\n✅ ARCHITECTURE COMPLETE.`));
  console.log(`\nTo arise your agent:\n  cd ${config.projectName}\n  npm run arise`);
}

function getFeaturesForStack(stack) {
    // Web Stacks usually get TS
    if (stack.includes('next') || stack.includes('react')) return ['ts', 'test', 'ci'];
    
    // Mobile Stacks
    if (stack === 'expo') return ['ts', 'test', 'ci']; // React Native uses TS
    if (stack === 'flutter') return ['test', 'ci']; // Flutter uses Dart, NOT TS
    
    return ['test', 'ci'];
}

function generateMission(config) {
  const { stack, features, customDescription } = config;
  let rules = [];
  let architectureNotes = "";
  let negativeConstraints = "";

  // Stack Specific Rules & Constraints
  if (stack === 'next_node') {
    architectureNotes = "## 🏗️ ARCHITECTURE: MONOREPO (Frontend + Backend)\n- **Structure:** Create two folders: `client/` (Next.js) and `server/` (Node.js/Express).\n- **Comm:** Frontend talks to Backend via env vars (`NEXT_PUBLIC_API_URL`).";
    rules.push("- **Next.js:** Use App Router.");
    rules.push("- **Node.js:** Use Express or NestJS. Strict Validation.");
  } else if (stack === 'react_node') {
    architectureNotes = "## 🏗️ ARCHITECTURE: SEPARATE CLIENT/SERVER\n- **Client:** React (Vite). **Server:** Node.js.";
  } else if (stack === 'next_full') {
    architectureNotes = "## 🏗️ ARCHITECTURE: NEXT.JS FULLSTACK\n- **Structure:** All logic inside `app/api` or Server Actions.\n- **DB:** Connect directly via server components.";
  } else if (stack === 'expo') {
    architectureNotes = "## 🏗️ ARCHITECTURE: REACT NATIVE (EXPO)\n- **Mobile First:** Verify UI on small screens.";
    negativeConstraints = "1. **NO HTML/CSS:** You are building for Mobile. Do NOT use `<div>`, `<span>`, or CSS files. Use `<View>`, `<Text>`, and `StyleSheet`.\n2. **NO DOM:** `document` and `window` do not exist.";
  } else if (stack === 'flutter') {
    architectureNotes = "## 🏗️ ARCHITECTURE: FLUTTER (DART)\n- **Language:** Use Dart. Do NOT use JavaScript/TypeScript.\n- **Widgets:** Everything is a Widget. Use `MaterialApp` as root.";
    negativeConstraints = "1. **NO HTML/CSS/JS:** This is a Flutter project. HTML tags and CSS are INVALID.\n2. **NO NPM:** Use `pubspec.yaml` for dependencies, not `package.json`.";
  }

  if (customDescription) {
      architectureNotes = `## 🏗️ ARCHITECTURE: CUSTOM (${customDescription})\n- **Directive:** Follow industry best practices for this stack.`;
  }

  // Feature Rules
  if (features && features.includes('docker')) rules.push("- **Docker:** Maintain a working `Dockerfile`.");
  if (features && features.includes('ts')) rules.push("- **TypeScript:** STRICT `tsconfig`. No `any`.");
  if (features && features.includes('test')) rules.push("- **Testing:** TDD is mandatory. 100% critical path coverage.");

  return `# 🛑 AGENT PROTOCOL: ZERO-DEFECT ARCHITECTURE
> **SYSTEM OVERRIDE:** You are an **Autonomous Senior Architect**.

---

## 🧠 PHASE 0: Planning & Context
1.  **Analyze:** Read \`package.json\`.
2.  **Plan:** Create \`.antigravity/CURRENT_PLAN.md\`.
3.  **Confirm:** Ask user.

---

${architectureNotes}

## 💻 TECH STACK RULES
${rules.join('\n')}

---

## ⛔ NEGATIVE CONSTRAINTS (DO NOT IGNORE)
${negativeConstraints || "1. No Hallucinated Imports."}

---

## 🔄 PHASE 1: The TDD Loop
1.  **RED:** Write failing test.
2.  **GREEN:** Write minimal code.
3.  **VERIFY:** Run tests.

---

## 🛡️ PHASE 2: Anti-Slop
1.  **Clean Logs:** No console.log.
2.  **Zero Tolerance:** Tests must pass.

---

## 🏁 PHASE 4: Handover
1.  Run full suite.
2.  Run compliance: \`npm run agent:verify\`.
3.  Output: "✅ BUILD SUCCESSFUL."
`;
}

init();
