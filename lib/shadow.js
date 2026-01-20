const fs = require('fs-extra');
const path = require('path');
const kleur = require('kleur');

function generateMission(stack, features, customDescription) {
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
  } else if (stack === 'node_express') {
      architectureNotes = "## 🏗️ ARCHITECTURE: BACKEND API (Express + TS)\n- **Structure:** `src/` directory with `index.ts` entry point.\n- **Standards:** Use `zod` for validation, `helmet` for security.";
  } else if (stack === 'expo') {
    architectureNotes = "## 🏗️ ARCHITECTURE: REACT NATIVE (EXPO)\n- **Mobile First:** Verify UI on small screens.";
    negativeConstraints = "1. **NO HTML/CSS:** You are building for Mobile. Do NOT use `<div>`, `<span>`, or CSS files. Use `<View>`, `<Text>`, and `StyleSheet`.\n2. **NO DOM:** `document` and `window` do not exist.";
  } else if (stack === 'flutter') {
    architectureNotes = "## 🏗️ ARCHITECTURE: FLUTTER (DART)\n- **Language:** Use Dart. Do NOT use JavaScript/TypeScript.\n- **Widgets:** Everything is a Widget. Use `MaterialApp` as root.";
    negativeConstraints = "1. **NO HTML/CSS/JS:** This is a Flutter project. HTML tags and CSS are INVALID.\n2. **NO NPM:** Use `pubspec.yaml` for dependencies, not `package.json`.";
  } else if (stack === 'python_fastapi') {
    architectureNotes = "## 🏗️ ARCHITECTURE: PYTHON FASTAPI\n- **Language:** Python 3.10+.\n- **Framework:** FastAPI + Pydantic.\n- **Style:** PEP 8.";
    rules.push("- **Type Hints:** ALWAYS use Type Hints.");
    rules.push("- **Async:** Use `async def` for route handlers.");
  }

  return `# 🛑 AGENT PROTOCOL: ZERO-DEFECT ARCHITECTURE
> **SYSTEM OVERRIDE:** You are an **Autonomous Senior Architect**.

---

## 🧠 PHASE 0: Planning & Context
1.  **Analyze:** Read \`package.json\` and \`.antigravity/CURRENT_TASK.md\`.
2.  **Plan:** Create \`.antigravity/CURRENT_PLAN.md\`.
3.  **Confirm:** Ask user via Chat.

---

${architectureNotes}

## 💻 TECH STACK RULES
${rules.join('\n')}

---

## ⛔ NEGATIVE CONSTRAINTS (DO NOT IGNORE)
${negativeConstraints || "1. No Hallucinated Imports."}

---

## 🏁 PHASE 4: Handover
1.  Run tests.
2.  Run compliance: \`npm run agent:verify\`.
3.  Output: "✅ BUILD SUCCESSFUL."
`;
}

function injectShadow(targetDir, stack, type) {
    const templateDir = path.join(__dirname, '../template');
    const antiGravitySource = path.join(templateDir, '.antigravity');
    const antiGravityDest = path.join(targetDir, '.antigravity');
    
    fs.copySync(antiGravitySource, antiGravityDest);
    
    // Mission Generation
    const missionContent = generateMission(stack);
    fs.writeFileSync(path.join(targetDir, '.antigravity/MISSION.md'), missionContent);
    
    // Package.json merging
    // Package.json merging
    const pkgPath = path.join(targetDir, 'package.json');
    let pkg = {};
    
    if (fs.existsSync(pkgPath)) {
        pkg = fs.readJsonSync(pkgPath);
    } else {
        // Force create if missing (e.g. Flutter/Custom or Failed Scaffold)
        pkg = {
            name: type === 'standalone' ? path.basename(targetDir) : type,
            version: '0.0.1',
            private: true,
            description: 'Shadow Gravity Control Plane'
        };
    }

    // Ensure scripts object exists
    if (!pkg.scripts) pkg.scripts = {};
    
    // Add arise command
    pkg.scripts.arise = "node .antigravity/arise.js";
    pkg.scripts["agent:verify"] = "node .antigravity/scripts/verify.js";
    pkg.scripts["agent:plan"] = "node .antigravity/scripts/plan.js";
    
    // Add devDependencies for arise prompt
    if (!pkg.devDependencies) pkg.devDependencies = {};
    pkg.devDependencies["prompts"] = "^2.4.2";
    pkg.devDependencies["kleur"] = "^4.1.5";
    
    fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
    
    // Cleanup - we can add logic here if we need to remove specific template files
}

function cleanupScaffold(targetDir) {
    // Example: Remove generic template README if specific one exists
    // For now, the modular design keeps things clean by default.
}

module.exports = { injectShadow, generateMission };
