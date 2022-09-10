export const tsLoader = {
    loader: 'ts-loader',
};

export const swcLoader = {
    loader: 'swc-loader',
    options: {
        // This makes swc-loader invoke swc synchronously.
        // sync: true,
        jsc: {
            parser: {
                syntax: 'ecmascript',
                jsx: false,
                dynamicImport: false,
                privateMethod: false,
                functionBind: false,
                exportDefaultFrom: false,
                exportNamespaceFrom: false,
                decorators: false,
                decoratorsBeforeExport: false,
                topLevelAwait: false,
                importMeta: false,
            },
            transform: null,
            target: 'es2020',
            loose: false,
            externalHelpers: false,
            // Requires v1.2.50 or upper and requires target to be es2016 or upper.
            keepClassNames: false,
        },
    },
};

export const javascriptLoaders = [swcLoader];

export const typescriptLoaders = [swcLoader, tsLoader];

export const sassLoaders = [
    {
        loader: 'style-loader',
    },
    {
        loader: 'css-loader',
    },
    {
        loader: 'sass-loader',
    },
];
