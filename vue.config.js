const path = require('path')
const resolve = (dir) => path.join(process.cwd(), dir)


module.exports = {
    lintOnSave: false,
    publicPath: "/peanut_ui",
    devServer: {
        proxy: {
            "/peanut": {
                target: "http://127.0.0.1:7676/", //本地
                changeOrigin: true,
                pathRewrite: {"^/peanut": ""}
            }
        },
    },
    configureWebpack() {
        return {
            resolve: {
                alias: {
                    '@': resolve('src'),
                },
            },
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.module
            .rule("file")
            .test(/.(xls|xlsx)$/)
            .use("c")
            .loader("file-loader")
            .options({
                name: "[name].[ext]",
                outputPath: "templates"
            });

        config.when(process.env.NODE_ENV !== 'development', (config) => {
            config.performance.set('hints', false)
            config.devtool('none')
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial',
                    },
                    elementUI: {
                        name: 'chunk-elementUI',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                    }
                }
            })
        })
    },
    css: {
        requireModuleExtension: true,
        sourceMap: true,
        loaderOptions: {
            scss: {
                sassOptions: {
                    indentedSyntax: false,
                },
                /*sass-loader 8.0语法 */
                //prependData: '@import "~@/styles/variables.scss";',
                /*sass-loader 9.0写法，感谢github用户 shaonialife*/
                additionalData(content, loaderContext) {
                    const {resourcePath, rootContext} = loaderContext
                    const relativePath = path.relative(rootContext, resourcePath).replace(/\\/g, '/')
                    const noPrependPaths = ["src/peanut/styles/variables.scss"];
                    if (!noPrependPaths.find(path => relativePath.indexOf(path) > -1)) {
                        content = `@import "~@/peanut/styles/variables.scss";\r\n` + content;
                    }
                    // if (relativePath === "src/peanut/styles/index.scss") {
                    //     content = `@import "~@/peanut/styles/themes/${theme}/variables.scss";\r\n` + content;
                    // }
                    return content;
                }
            }
        }
    }
}
