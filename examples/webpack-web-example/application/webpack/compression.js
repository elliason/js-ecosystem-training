import CompressionPlugin from 'compression-webpack-plugin';
import zlib from 'zlib';

export const compression = [
    new CompressionPlugin(),
    new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
            params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
        },
        threshold: 0,
        minRatio: 0.8,
        deleteOriginalAssets: false,
    }),
];
