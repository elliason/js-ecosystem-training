/**
 * Loads page related chunk scripts and styles
 */
async function loader() {
    const page = document.body.dataset?.page;

    try {
        const { default: common } = await import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "common" */
            `./common`
        );
        common();
    } catch (e) {
        console.error('Error loading common scripts', e);
    }

    if (page) {
        try {
            const { default: pageScript } = await import(`./pages/${page}/${page}`);
            pageScript();
        } catch (e) {
            console.error('Error loading page script', e);
        }
    }
}

export default loader;
