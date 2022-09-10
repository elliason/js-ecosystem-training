import { dirname, infoLog } from 'platypus-tools';
import path from 'path';
import { javascriptLoaders, sassLoaders, typescriptLoaders } from './webpack/loaders.js';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { imageSharpOptimization } from './webpack/imageOptimization.js';
import { compression } from './webpack/compression.js';

export default (env, argv) => {
    const __dirname = dirname(import.meta.url);
    const isProfiling = argv.profile;
    const isProduction = argv.mode === 'production';
    if (!isProfiling) {
        infoLog('--- webpack config ---');
        infoLog('env: ');
        console.dir(env);
        infoLog('argv: ');
        console.dir(argv);
        infoLog('--- Building Application ---');
    }
    return {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval',
        entry: './assets/src/index.ts',
        output: {
            path: path.resolve(__dirname, 'assets/dist'),
            publicPath: '/assets/dist/',
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: javascriptLoaders,
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: typescriptLoaders,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: sassLoaders,
                    sideEffects: true,
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp|tiff?)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx', '.json', 'scss', 'css', 'less', '...'],
        },
        plugins: [
            ...(isProduction ? compression : []),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        context: 'assets/src',
                        from: 'images/**/**',
                    },
                ],
            }),
        ],
        optimization: {
            minimizer: [...imageSharpOptimization],
        },
    };
};
