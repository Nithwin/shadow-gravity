const fs = require('fs');
const path = require('path');
const kleur = require('kleur');

function plan() {
    console.log(kleur.cyan('🧠 Shadow Gravity: Strategic Planner'));
    
    const planPath = path.join(process.cwd(), '.antigravity', 'CURRENT_PLAN.md');
    
    if (fs.existsSync(planPath)) {
        console.log(kleur.green(`\nExisting Plan found at: ${planPath}`));
        console.log(kleur.dim(fs.readFileSync(planPath, 'utf8')));
    } else {
        console.log(kleur.yellow('\n⚠️  No Active Plan found.'));
        console.log(kleur.dim('The Agent should create one based on MISSION.md before coding.'));
    }
}

plan();
