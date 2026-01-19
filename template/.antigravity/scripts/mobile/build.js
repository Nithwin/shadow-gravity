const { execSync } = require('child_process');
const kleur = require('kleur');

console.log(kleur.cyan('📱 Mobile Build Protocol Initiated...'));

// Detect if Flutter or Expo
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const isFlutter = fs.existsSync(path.join(projectRoot, 'pubspec.yaml'));
const isExpo = fs.existsSync(path.join(projectRoot, 'app.json'));

try {
    if (isFlutter) {
        console.log(kleur.dim('> flutter build apk --release'));
        execSync('flutter build apk --release', { stdio: 'inherit' });
        console.log(kleur.green('✅ APK Built Successfully.'));
    } else if (isExpo) {
        console.log(kleur.dim('> npx expo build:android'));
        execSync('npx expo build:android', { stdio: 'inherit' });
        console.log(kleur.green('✅ Android Bundle Built Successfully.'));
    } else {
        console.log(kleur.yellow('⚠️  Unknown Mobile Framework. No build command run.'));
    }
} catch (e) {
    console.log(kleur.red('❌ Build Failed.'));
}
