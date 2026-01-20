const fs = require('fs-extra');
const path = require('path');
const kleur = require('kleur');

console.log(kleur.cyan('🚀 Shadow OPS: Initializing Deployment Protocol...'));

const rootDir = process.cwd();
const githubDir = path.join(rootDir, '.github', 'workflows');

const deployWorkflow = `
name: Shadow Deploy

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: user/app:latest
`;

try {
    fs.ensureDirSync(githubDir);
    fs.writeFileSync(path.join(githubDir, 'deploy.yml'), deployWorkflow.trim());
    console.log(kleur.green('✅ .github/workflows/deploy.yml created.'));
} catch (e) {
    console.log(kleur.red(`❌ Failed to write deployment workflow: ${e.message}`));
}
