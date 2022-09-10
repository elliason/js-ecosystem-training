import sayHi from './lib/sayHi';
import loader from './loader';

const main = () => {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Hello, world!');
        sayHi('TypeScript');

        // dynamically load scripts for current page
        (async () => {
            await loader();
        })();
    });
};

export default main;
