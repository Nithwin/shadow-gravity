const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const kleur = require('kleur');

console.log(kleur.cyan('🌱 Shadow SEED: Database Population...'));

const rootDir = process.cwd();
const pySeed = path.join(rootDir, 'seed.py');
const tsSeed = path.join(rootDir, 'prisma/seed.ts');

if (fs.existsSync(pySeed)) {
    console.log(kleur.dim(`> Found seed.py`));
    try {
        execSync('python seed.py', { stdio: 'inherit' });
        console.log(kleur.green('✅ Data seeded successfully.'));
    } catch (e) {
        console.log(kleur.red(`❌ Python Seeding failed: ${e.message}`));
    }
} else if (fs.existsSync(tsSeed)) {
    console.log(kleur.dim(`> Found prisma/seed.ts`));
    try {
        execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });
        console.log(kleur.green('✅ Data seeded successfully.'));
    } catch (e) {
        console.log(kleur.red(`❌ Prisma Seeding failed: ${e.message}`));
    }
} else {
    console.log(kleur.yellow('⚠️  No seed file found (seed.py or prisma/seed.ts).'));
    console.log(kleur.dim('Creating a template for you...'));
    
    // Auto-create template
    if (fs.existsSync(path.join(rootDir, 'requirements.txt'))) {
        fs.writeFileSync(pySeed, 'print("🌱 Seeding data...")\n# Add your seeding logic here\nprint("✅ Done.")');
        console.log(kleur.green('✅ Created seed.py template. Run command again to execute.'));
    } else {
        const prismaDir = path.join(rootDir, 'prisma');
        if (!fs.existsSync(prismaDir)) fs.mkdirSync(prismaDir);
        fs.writeFileSync(tsSeed, 'console.log("🌱 Seeding data...");\n// Add seeding logic\nconsole.log("✅ Done.");');
        console.log(kleur.green('✅ Created prisma/seed.ts template. Run command again to execute.'));
    }
}
