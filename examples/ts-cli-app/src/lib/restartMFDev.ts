import shell from 'shelljs';
import path from 'path';

export default function RestartMFDev(pathToDevRepo: string) {
    try {
        const repoPath = path.normalize(pathToDevRepo);
        process.chdir(repoPath);
        shell.exec(`./bin/stop`);
        shell.exec(`./bin/start`);
    } catch (e) {
        console.error('stopping mf dev environment failed');
        console.error(e);
    }
}
