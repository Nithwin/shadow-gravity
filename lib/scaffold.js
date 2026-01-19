const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const kleur = require('kleur');

function ensureTool(tool) {
    try {
        execSync(`${tool} --version`, { stdio: 'ignore' });
    } catch (e) {
        console.log(kleur.yellow(`⚠️  ${tool} is missing.`));
        console.log(kleur.dim(`Shadow Gravity recommends installing ${tool} globally.`));
    }
}

function scaffoldFramework(stack, targetDir, name) {
    fs.ensureDirSync(targetDir);
    const parentDir = path.dirname(targetDir);
    const dirName = path.basename(targetDir);
    const templateDir = path.join(__dirname, '../template');

    try {
        if (stack === 'flutter') {
            ensureTool('flutter');
            execSync(`cd ${parentDir} && flutter create ${dirName}`, { stdio: 'inherit' });
        } else if (stack === 'expo') {
            ensureTool('npx');
            execSync(`cd ${parentDir} && npx create-expo-app ${dirName} --template blank-typescript`, { stdio: 'inherit' });
        } else if (stack === 'node_express') {
             // INDUSTRY STANDARD BACKEND SCAFFOLDING
             console.log(kleur.cyan('🏗️  Constructing STRICT Express Core...'));
             
             // 1. Package.json
             const pkg = {
                 name: name,
                 version: "0.0.1",
                 scripts: {
                     "dev": "nodemon src/index.ts",
                     "build": "tsc",
                     "start": "node dist/index.js",
                     "arise": "node .antigravity/arise.js"
                 },
                 dependencies: {
                     "express": "^4.18.2",
                     "cors": "^2.8.5",
                     "helmet": "^7.1.0",
                     "dotenv": "^16.4.1",
                     "zod": "^3.22.4"
                 },
                 devDependencies: {
                     "typescript": "^5.3.3",
                     "@types/node": "^20.11.16",
                     "@types/express": "^4.17.21",
                     "@types/cors": "^2.8.17",
                     "ts-node": "^10.9.2",
                     "nodemon": "^3.0.3"
                 }
             };
             fs.writeJsonSync(path.join(targetDir, 'package.json'), pkg, { spaces: 2 });

             // 2. TsConfig (Strict)
             const tsconfig = {
                 compilerOptions: {
                     target: "es2020",
                     module: "commonjs",
                     strict: true,
                     esModuleInterop: true,
                     skipLibCheck: true,
                     forceConsistentCasingInFileNames: true,
                     outDir: "./dist",
                     rootDir: "./src"
                 }
             };
             fs.writeJsonSync(path.join(targetDir, 'tsconfig.json'), tsconfig, { spaces: 2 });

             // 3. Source Structure
             const srcDir = path.join(targetDir, 'src');
             fs.ensureDirSync(srcDir);
             fs.writeFileSync(path.join(srcDir, 'index.ts'), `import express from 'express';\nimport dotenv from 'dotenv';\n\ndotenv.config();\n\nconst app = express();\nconst port = process.env.PORT || 3001;\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n  res.json({ status: 'active', system: 'Shadow Gravity Backend' });\n});\n\napp.listen(port, () => {\n  console.log(\`⚡ Server running at http://localhost:\${port}\`);\n});\n`);
             
             // Install Deps
             console.log(kleur.dim(`> npm install (Express Core)...`));
             try { execSync(`cd ${targetDir} && npm install`, { stdio: 'inherit' }); } catch(e) {}

        } else if (stack === 'next_node') {
            execSync(`cd ${parentDir} && npx create-next-app@latest ${dirName} --use-npm --typescript --eslint --no-src-dir --app --import-alias "@/*"`, { stdio: 'inherit' });
        } else {
            // Default: Copy template and ensure src exists
            fs.copySync(templateDir, targetDir); 
        }
    } catch(e) {
        console.log(kleur.red(`Failed to scaffold ${stack}. Error: ${e.message}`));
    }
}

module.exports = { ensureTool, scaffoldFramework };
