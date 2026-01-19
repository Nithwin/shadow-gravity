const { execSync } = require('child_process');
const kleur = require('kleur');

console.log(kleur.cyan('🗄️  Database Sync Protocol...'));

try {
    console.log(kleur.dim('> Checking for Prisma...'));
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log(kleur.green('✅ Client Generated.'));
} catch (e) {
    console.log(kleur.yellow('⚠️  Prisma not found or failed. Skipping DB sync.'));
}
