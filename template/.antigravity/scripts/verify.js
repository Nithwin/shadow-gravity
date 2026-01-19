const fs = require('fs');
const path = require('path');
const kleur = require('kleur');

const TARGET_DIR = path.join(process.cwd(), 'src');
const BANNED_PATTERNS = [
    { regex: /console\.log\(/, message: '🚫 No console.log allowed in production code.' },
    { regex: /TODO:/, message: '⚠️  Unresolved TODO found.' },
    { regex: /FIXME:/, message: '🚨 Critical FIXME found.' },
];

function verify() {
    console.log(kleur.cyan('🛡️  Shadow Gravity: Verification Protocol Initiated...'));
    
    if (!fs.existsSync(TARGET_DIR)) {
        console.log(kleur.yellow('⚠️  No src/ directory found. Skipping code scan.'));
        return;
    }

    let errorCount = 0;
    
    function scanDir(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDir(fullPath);
            } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.dart') || file.endsWith('.tsx') || file.endsWith('.jsx')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                BANNED_PATTERNS.forEach(pattern => {
                    if (pattern.regex.test(content)) {
                        console.log(kleur.red(`${pattern.message} in ${file}`));
                        errorCount++;
                    }
                });
            }
        }
    }

    scanDir(TARGET_DIR);

    if (errorCount > 0) {
        console.log(kleur.red(`\n❌ Verification Failed: ${errorCount} issues found.`));
        process.exit(1);
    } else {
        console.log(kleur.green('\n✅ Code Compliance Verified. Zero Defects detected.'));
    }
}

verify();
