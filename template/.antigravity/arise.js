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
        const domain = parts[0]; // mobile, web, backend
        const action = parts[1]; // build, deploy, db

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
             console.log(kleur.dim(`Available: /mobile build, /web deploy, /backend db`));
        }

    } else if (cmd.length > 0) {
        // NATURAL LANGUAGE -> TASK
        const taskFile = path.join(__dirname, 'CURRENT_TASK.md');
        const content = `# 🎯 CURRENT OBJECTIVE\n${cmd}\n\n> Timestamp: ${new Date().toISOString()}`;
        fs.writeFileSync(taskFile, content);
        
        console.log(kleur.green(`\n✅ PROTOCOL UPDATED.`));
        console.log(kleur.cyan(`\nAgent Focus set to: "${cmd}"`));
    } else {
        console.log(kleur.red("❌ No command received. Sleeping..."));
    }
}

wakeUp();
