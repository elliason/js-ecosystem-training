import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

export const imageSharpOptimization = [
    new ImageMinimizerPlugin({
        generator: [
            {
                type: 'asset',
                implementation: ImageMinimizerPlugin.sharpGenerate,
                options: {
                    encodeOptions: {
                        webp: {
                            quality: 90,
                        },
                    },
                },
            },
        ],
    }),
];
