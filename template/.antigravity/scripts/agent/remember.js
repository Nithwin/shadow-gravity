const fs = require('fs-extra');
const path = require('path');
const kleur = require('kleur');

const decisionFile = path.join(process.cwd(), '.antigravity', 'DECISIONS.md');
const args = process.argv.slice(2).join(' ');

if (!args) {
    console.log(kleur.red('❌ Missing memory content. Usage: /agent remember "Use X for Y"'));
    process.exit(1);
}

const timestamp = new Date().toISOString();
const entry = `\n## [${timestamp}]\n${args}\n`;

try {
    fs.ensureFileSync(decisionFile);
    fs.appendFileSync(decisionFile, entry);
    console.log(kleur.green('✅ Memory Stored in DECISIONS.md'));
} catch (e) {
    console.log(kleur.red(`❌ Failed to save memory: ${e.message}`));
}
