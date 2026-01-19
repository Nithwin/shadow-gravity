const fs = require('fs');
const path = require('path');

const missionPath = path.join(__dirname, 'MISSION.md');

console.log("\x1b[35m\x1b[1m"); // Magenta Bold
console.log("🌑 WAKEY WAKEY... LITTLE SHADOW.");
console.log("==================================");
console.log("\x1b[0m"); // Reset

if (fs.existsSync(missionPath)) {
    console.log(fs.readFileSync(missionPath, 'utf8'));
} else {
    console.error("❌ MISSION.md NOT FOUND. The shadow is lost.");
}
