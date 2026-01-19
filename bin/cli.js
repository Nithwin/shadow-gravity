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
      🌑 GRAVITY PROTOCOL v2.0
`));

async function init() {
  let projectConfig = {};

  // 1. Basic Info
  const basics = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Name your Shadow extraction:',
      initial: 'my-shadow-app'
    },
    {
      type: 'select',
      name: 'mode',
      message: 'Select Operation Mode:',
      choices: [
        { title: '🚀 Rapid Deployment (Best Practice Stacks)', value: 'rapid' },
        { title: '🛠️ Custom Architect (Granular Control)', value: 'custom' }
      ]
    }
  ]);

  if (!basics.projectName) return console.log(kleur.red('❌ Cancelled.'));
  projectConfig = { ...basics };

  // 2. Stack Selection
  if (basics.mode === 'rapid') {
    const rapid = await prompts({
      type: 'select',
      name: 'stack',
      message: 'Choose a Pre-Configured "God Stack":',
      choices: [
        { title: 'Web Standard (Next.js + TS + Tailwind + Shad/cn)', value: 'web_god' },
        { title: 'API Light (Hono + Cloudflare Workers)', value: 'api_god' },
        { title: 'App Heavy (Expo + React Native + Supabase)', value: 'app_god' },
        { title: 'Python AI (FastAPI + LangChain + Pinecone)', value: 'ai_god' }
      ]
    });
    // Hydrate config based on preset
    projectConfig.features = getPresetFeatures(rapid.stack);
    projectConfig.framework = getPresetFramework(rapid.stack);
  } else {
    // Custom Flow
    const custom = await prompts([
      {
        type: 'select',
        name: 'framework',
        message: 'Core Framework:',
        choices: [
            { title: 'Next.js', value: 'nextjs' },
            { title: 'React (Vite)', value: 'react' },
            { title: 'Node (Express)', value: 'express' },
            { title: 'Hono', value: 'hono' },
            { title: 'Python (FastAPI)', value: 'fastapi' }
        ]
      },
      {
        type: 'multiselect',
        name: 'features',
        message: 'Inject Extra Modules:',
        choices: [
            { title: 'TypeScript (Strict)', value: 'ts', selected: true },
            { title: 'Tailwind CSS', value: 'tailwind', selected: true },
            { title: 'Docker / Containerization', value: 'docker' },
            { title: 'GitHub Actions (CI/CD)', value: 'ci' },
            { title: 'Prisma / Drizzle (Database)', value: 'db' },
            { title: 'Jest / Vitest', value: 'test', selected: true }
        ]
      }
    ]);
    projectConfig = { ...projectConfig, ...custom };
  }

  // 3. Power Level
  const power = await prompts({
      type: 'select',
      name: 'powerLevel',
      message: 'Constraint Level:',
      choices: [
        { title: 'S-Rank (Strict TDD / No Hallucinations)', value: 's-rank' },
        { title: 'E-Rank (Casual)', value: 'e-rank' }
      ]
  });
  projectConfig.powerLevel = power.powerLevel;

  // --- EXECUTION ---
  const targetDir = path.join(process.cwd(), projectConfig.projectName);
  const templateDir = path.join(__dirname, '../template');

  if (fs.existsSync(targetDir)) {
    console.log(kleur.red(`❌ Error: ${projectConfig.projectName} already exists.`));
    process.exit(1);
  }

  console.log(kleur.cyan(`\n📦 Initializing Shadow Artifacts in ${projectConfig.projectName}...`));
  fs.copySync(templateDir, targetDir);

  console.log(kleur.cyan(`🧠 Forging Custom Protocol...`));
  const missionContent = generateMission(projectConfig);
  fs.writeFileSync(path.join(targetDir, '.antigravity/MISSION.md'), missionContent);

  // Initialize Git
  try { execSync(`git init ${targetDir}`, { stdio: 'ignore' }); } catch (e) {}

  // Install Deps (Simulated/Real)
  let installCmd = `cd ${projectConfig.projectName} && npm install`;
  
  // Note: In a real tool, we would also npm install the selected packages (next, react, etc.)
  // For this scaffold, we purely set up the *Agent's Environment*.
  
  console.log(kleur.cyan('\nYour Shadow Soldiers are installing dependencies...'));
  try {
    execSync(installCmd, { stdio: 'inherit' });
  } catch(e) { console.log(kleur.yellow('⚠️ npm install issues.')); }

  console.log(kleur.green(`\n✅ EXTRACTION COMPLETE.`));
  console.log(`\nTo arise your agent:\n  cd ${projectConfig.projectName}\n  npm run arise`);
}

// Helpers
function getPresetFeatures(preset) {
    if (preset === 'web_god') return ['ts', 'tailwind', 'test'];
    if (preset === 'api_god') return ['ts', 'db', 'test'];
    if (preset === 'app_god') return ['ts', 'db'];
    if (preset === 'ai_god') return ['docker'];
    return [];
}
function getPresetFramework(preset) {
    if (preset === 'web_god') return 'nextjs';
    if (preset === 'api_god') return 'hono';
    if (preset === 'app_god') return 'expo';
    if (preset === 'ai_god') return 'fastapi';
    return 'node';
}

function generateMission(config) {
  const { framework, features, powerLevel } = config;
  
  const rules = [];

  // Framework Rules
  if (framework === 'nextjs') rules.push("- **Next.js:** Use App Router. Use Server Actions for data mutation.");
  if (framework === 'hono') rules.push("- **Hono:** Keep it edge-compatible. No Node.js specific APIs.");
  if (framework === 'fastapi') rules.push("- **FastAPI:** Use Pydantic v2. Use `async def`.");

  // Feature Rules
  if (features.includes('ts')) rules.push("- **TypeScript:** STRICT MODE. No `any`. Interfaces for everything.");
  if (features.includes('tailwind')) rules.push("- **Tailwind:** Use utility classes. No custom CSS files.");
  if (features.includes('docker')) rules.push("- **Docker:** You MUST create a `Dockerfile`. Verify it builds with `docker build .`.");
  if (features.includes('ci')) rules.push("- **CI/CD:** Create `.github/workflows/main.yml` that runs tests on push.");
  if (features.includes('db')) rules.push("- **Database:** Use migrations. Do not manually edit the DB schema.");

  let sRank = "";
  if (powerLevel === 's-rank') {
      sRank = `
## 🌑 SHADOW GRAVITY: S-RANK RESTRICTIONS
1. **Zero Tolerance:** You are FORBIDDEN from committing without tests.
2. **No TODOs:** Any "TODO" comments will cause the Shadow to reject the build.
3. **The Verify Script:** You must run \`npm run agent:verify\` before every commit.
      `;
  }

  return `# 🛑 AGENT PROTOCOL: ZERO-DEFECT ARCHITECTURE
> **SYSTEM OVERRIDE:** You are an **Autonomous Senior Engineer**.

---

## 🧠 PHASE 0: Planning (Measure Twice)
1.  **Analyze:** Read \`package.json\`.
2.  **Plan:** Create \`.antigravity/CURRENT_PLAN.md\`.
3.  **Confirm:** Ask user.

---

## 💻 TECH STACK RULES
${rules.join('\n')}

---

## 🔄 PHASE 1: The TDD Loop
1.  **RED:** Write failing test.
2.  **GREEN:** Write minimal code.
3.  **VERIFY:** Run tests.

---

## 🛡️ PHASE 2: Anti-Slop
1.  **No Hallucinations:** Check imports.
2.  **Clean Logs:** No console.log.
${sRank}

---

## 🏁 PHASE 4: Handover
1.  Run full suite.
2.  Output: "✅ BUILD SUCCESSFUL."
`;
}

init();
