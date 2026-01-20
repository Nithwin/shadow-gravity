const fs = require('fs');
const path = require('path');
const kleur = require('kleur');

console.log(kleur.cyan('🔐 Shadow OPS: Environment Manager...'));

const rootDir = process.cwd();
const envPath = path.join(rootDir, '.env');
const examplePath = path.join(rootDir, '.env.example');

const args = process.argv.slice(2);
const command = args[0] || 'check';

if (command === 'init') {
    if (!fs.existsSync(examplePath)) {
        console.log(kleur.yellow('⚠️  .env.example not found. Creating a default one...'));
        fs.writeFileSync(examplePath, 'PORT=3000\nDATABASE_URL=file:./dev.db\n');
    }
    
    if (fs.existsSync(envPath)) {
        console.log(kleur.yellow('⚠️  .env already exists. Skipping creation.'));
    } else {
        fs.copyFileSync(examplePath, envPath);
        console.log(kleur.green('✅ .env initialized from .env.example'));
    }

} else if (command === 'check') {
    if (!fs.existsSync(examplePath) || !fs.existsSync(envPath)) {
        console.log(kleur.red('❌ Missing .env or .env.example'));
        return;
    }

    const parseEnv = (content) => content.split('\n')
        .filter(l => l && !l.startsWith('#'))
        .map(l => l.split('=')[0].trim());

    const exampleKeys = parseEnv(fs.readFileSync(examplePath, 'utf-8'));
    const envKeys = parseEnv(fs.readFileSync(envPath, 'utf-8'));

    const missing = exampleKeys.filter(k => !envKeys.includes(k));

    if (missing.length > 0) {
        console.log(kleur.red(`❌ Missing keys in .env: ${missing.join(', ')}`));
        process.exit(1);
    } else {
        console.log(kleur.green('✅ Environment variables match .env.example'));
    }
}
