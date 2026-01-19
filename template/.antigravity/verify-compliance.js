const fs = require('fs');
const path = require('path');

// Configuration
const BANNED_PATTERNS = [
  { pattern: 'TODO:', message: '❌ Found "TODO". Finish the code or throw an error.' },
  { pattern: 'console.log(', message: '❌ Found "console.log". Use a proper logger or remove debug code.' },
  { pattern: '// implementation here', message: '❌ Found placeholder comment. Write the actual code.' }
];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return false;
  
  const files = fs.readdirSync(dir);
  let hasError = false;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file.startsWith('.') || file === 'node_modules') continue;

    if (fs.statSync(fullPath).isDirectory()) {
      if (scanDir(fullPath)) hasError = true;
    } else {
      const content = fs.readFileSync(fullPath, 'utf-8');
      BANNED_PATTERNS.forEach(rule => {
        if (content.includes(rule.pattern)) {
          console.error(`[${file}] ${rule.message}`);
          hasError = true;
        }
      });
    }
  }
  return hasError;
}

console.log("🛡️ Running Dungeon Key Compliance Check...");
const failed = scanDir(path.join(__dirname, '../src'));

if (failed) {
  console.error("\n⛔ DUNGEON GATE CLOSED. Compliance violations found.");
  process.exit(1);
} else {
  console.log("✅ Code is Clean. The Gate opens.");
}
