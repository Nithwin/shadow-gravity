const fs = require('fs-extra');
const path = require('path');
const kleur = require('kleur');
const prompts = require('prompts');

console.log(kleur.cyan('🔥 Shadow FORGE: Schema Generation...'));

async function forge() {
    const rootDir = process.cwd();
    
    // 1. Detect Stack
    let stackType = 'node';
    if (fs.existsSync(path.join(rootDir, 'requirements.txt'))) {
        stackType = 'python';
    }

    // 2. Prompt for Forge Spec
    const response = await prompts({
        type: 'text',
        name: 'spec',
        message: 'Forge Spec (e.g., "User name:string email:string")',
    });

    if (!response.spec) return;
    
    const parts = response.spec.split(' ');
    const modelName = parts[0];
    const fields = parts.slice(1);

    if (stackType === 'node') {
        const prismaPath = path.join(rootDir, 'prisma/schema.prisma');
        if (fs.existsSync(prismaPath)) {
             let schema = `\nmodel ${modelName} {\n  id String @id @default(uuid())\n`;
             fields.forEach(f => {
                 const [name, type] = f.split(':');
                 const prismaType = type === 'string' ? 'String' : type === 'int' ? 'Int' : 'String';
                 schema += `  ${name} ${prismaType}\n`;
             });
             schema += `  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n`;
             
             fs.appendFileSync(prismaPath, schema);
             console.log(kleur.green(`✅ Model ${modelName} forged in schema.prisma`));
        } else {
            console.log(kleur.red('❌ prisma/schema.prisma not found. Run /backend init first.'));
        }

    } else {
        const modelsPath = path.join(rootDir, 'models.py');
        // Basic Append logic for Pydantic/SQLAlchemy could go here
        // For now, we stub it as a Pydantic model
        let code = `\nclass ${modelName}(BaseModel):\n    id: str\n`;
         fields.forEach(f => {
             const [name, type] = f.split(':');
             const pyType = type === 'string' ? 'str' : type === 'int' ? 'int' : 'str';
             code += `    ${name}: ${pyType}\n`;
         });
        code += `\n`;
        
        fs.ensureFileSync(modelsPath);
        fs.appendFileSync(modelsPath, code);
        console.log(kleur.green(`✅ Model ${modelName} forged in models.py`));
    }
}

forge();
