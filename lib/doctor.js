import { execa } from 'execa';
import ora from 'ora';
import kleur from 'kleur';

export async function runDoctor() {
    console.log(kleur.bold().underline('🩺  Shadow Gravity Doctor\n'));
    
    const checks = [
        { name: 'Node.js', cmd: 'node --version', optional: false },
        { name: 'NPM', cmd: 'npm --version', optional: false },
        { name: 'Git', cmd: 'git --version', optional: false },
        { name: 'Flutter', cmd: 'flutter --version', optional: true },
        { name: 'Python', cmd: 'python --version', optional: true },
        { name: 'Docker', cmd: 'docker --version', optional: true },
    ];

    for (const check of checks) {
        const spinner = ora(check.name).start();
        try {
            const [bin, ...args] = check.cmd.split(' ');
            const { stdout } = await execa(bin, args);
            // Clean version string (remove newlines, take first line)
            const version = stdout.split('\n')[0].trim(); 
            spinner.succeed(`${check.name} ${kleur.dim(`(${version})`)}`);
        } catch (e) {
            if (check.optional) {
                spinner.warn(`${check.name} ${kleur.dim('(Not Found - Optional)')}`);
            } else {
                spinner.fail(`${check.name} ${kleur.red('(MISSING)')}`);
            }
        }
    }

    console.log('\n' + kleur.cyan('System check complete.'));
}
