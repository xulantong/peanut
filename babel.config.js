module.exports = {
    presets: [
        ['@vue/app', {
            useBuiltIns: 'entry',
            corejs: {
                version: 3,
                proposals: true  // 搞定一些提案级别的特性
            },
            polyfills: [
                'es6.promise',
                'es6.symbol'
            ]
        }
        ]
    ],
    plugins: [
        // 可选链插件, 其他babel插件也是一样的安装方式
        "@babel/plugin-proposal-optional-chaining",
        //"非undefined且非null"判断
        "@babel/plugin-proposal-nullish-coalescing-operator"
    ]
}
