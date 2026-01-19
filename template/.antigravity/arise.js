const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const kleur = require('kleur');

console.log(kleur.magenta().bold(`
  🌑 WAKEY WAKEY... LITTLE SHADOW.
  ==================================
`));

async function wakeUp() {
    const response = await prompts({
        type: 'text',
        name: 'objective',
        message: 'What is your command? (e.g., "Build a Calculator")',
        initial: 'Build a feature...'
    });

    if (response.objective) {
        // Write to CURRENT_TASK.md or append to MISSION.md
        const taskFile = path.join(__dirname, 'CURRENT_TASK.md');
        const content = `# 🎯 CURRENT OBJECTIVE\n${response.objective}\n\n> Timestamp: ${new Date().toISOString()}`;
        
        fs.writeFileSync(taskFile, content);
        
        console.log(kleur.green(`\n✅ PROTOCOL UPDATED.`));
        console.log(kleur.cyan(`\nAgent Focus set to: "${response.objective}"`));
        console.log(kleur.dim(`\n(The Autonomous Agent will now detect this file and begin Phase 0 Planning)`));
    } else {
        console.log(kleur.red("❌ No command received. Sleeping..."));
    }
}

wakeUp();
