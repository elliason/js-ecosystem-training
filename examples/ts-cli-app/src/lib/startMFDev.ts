import shell from 'shelljs';
import path from 'path';

export default function StartMFDev(pathToDevRepo: string) {
    try {
        const repoPath = path.normalize(pathToDevRepo);
        process.chdir(repoPath);
        shell.exec(`./bin/start`);
    } catch (e) {
        console.error('starting mf dev environment failed');
        console.error(e);
    }
}