const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const kleur = require('kleur');
const { execSync } = require('child_process');

console.log(kleur.magenta().bold(`
  🌑 WAKEY WAKEY... LITTLE SHADOW.
  ==================================
`));

async function wakeUp() {
    const response = await prompts({
        type: 'text',
        name: 'command',
        message: 'Enter Command (e.g., "/mobile build" or "Build a Login Page")',
        initial: '/'
    });

    const cmd = response.command || '';

    if (cmd.startsWith('/')) {
        // SLASH COMMAND ROUTER
        const parts = cmd.slice(1).split(' ');
        const domain = parts[0]; 
        const action = parts[1];

        if (domain === 'help') {
             console.log(kleur.yellow('\n⚔️  THE SHADOW ARSENAL (Available Commands):\n'));
             const scriptsDir = path.join(__dirname, 'scripts');
             if (fs.existsSync(scriptsDir)) {
                 const categories = fs.readdirSync(scriptsDir);
                 categories.forEach(cat => {
                     const catPath = path.join(scriptsDir, cat);
                     if (fs.statSync(catPath).isDirectory()) {
                         const scripts = fs.readdirSync(catPath).filter(f => f.endsWith('.js'));
                         scripts.forEach(s => {
                             console.log(kleur.cyan(`  /${cat} ${s.replace('.js', '')}`));
                         });
                     } else if (cat.endsWith('.js')) {
                         console.log(kleur.cyan(`  /agent ${cat.replace('.js', '')}`));
                     }
                 });
             }
             console.log('');
             return;
        }

        const scriptPath = path.join(__dirname, 'scripts', domain, `${action}.js`);

        if (fs.existsSync(scriptPath)) {
            console.log(kleur.cyan(`\n⚡ Executing Slash Command: /${domain} ${action}`));
            try {
                require(scriptPath);
            } catch (e) {
                console.log(kleur.red(`❌ Script Failure: ${e.message}`));
            }
        } else {
             console.log(kleur.yellow(`\n⚠️  Unknown Command: /${domain} ${action}`));
             console.log(kleur.dim(`Type "/help" to see the full arsenal.`));
        }

    } else if (cmd.length > 0) {
        // NATURAL LANGUAGE -> TASK
        const taskFile = path.join(__dirname, 'CURRENT_TASK.md');
        const decisionFile = path.join(__dirname, '.antigravity', 'DECISIONS.md');
        
        let memory = "";
        if (fs.existsSync(decisionFile)) {
            memory = `\n\n## 🧠 LONG TERM MEMORY\n${fs.readFileSync(decisionFile, 'utf-8')}`;
        }

        const content = `# 🎯 CURRENT OBJECTIVE\n${cmd}\n\n> Timestamp: ${new Date().toISOString()}${memory}`;
        fs.writeFileSync(taskFile, content);
        
        console.log(kleur.green(`\n✅ MISSION SIGNAL BROADCAST.`));
        console.log(kleur.white(`\n The Shadow Protocol has recorded your intent: "${cmd}"`));
        console.log(kleur.dim(`\n NEXT STEPS:`));
        console.log(kleur.dim(` 1. The .antigravity/CURRENT_TASK.md beacon is active.`));
        console.log(kleur.dim(` 2. I am opening this file for you now...`));
        
        // AUTO-OPEN LOGIC
        try {
            const editor = process.env.EDITOR || 'code';
            // Try to open with VS Code / Cursor if available, else system default
            if (process.platform === 'win32') {
                execSync(`start "" "${taskFile}"`, { stdio: 'ignore' });
            } else if (process.platform === 'darwin') {
                execSync(`open "${taskFile}"`, { stdio: 'ignore' });
            } else {
                execSync(`xdg-open "${taskFile}"`, { stdio: 'ignore' });
            }
        } catch (e) {
            // Silently fail if no opener found, user will just see the manual steps.
        }

        console.log(kleur.dim(` 3. Your AI Agent will detect this file.`));
        console.log(kleur.magenta().bold(`\n👉 ACTION REQUIRED: Open your AI Chat and type "Execute Mission" or "Go".`));
    } else {
        console.log(kleur.red("❌ No command received. Sleeping..."));
    }
}

wakeUp();
