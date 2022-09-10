import shell from 'shelljs';
import path from 'path';

export default function StopMFDev(pathToDevRepo: string) {
    try {
        const repoPath = path.normalize(pathToDevRepo);
        process.chdir(repoPath);
        shell.exec(`./bin/stop`);
    } catch (e) {
        console.error('stopping mf dev environment failed');
        console.error(e);
    }
}
