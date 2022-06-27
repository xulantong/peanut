module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            "/peanut": {
                target: "http://127.0.0.1:7676/", //本地
                changeOrigin: true,
                pathRewrite: {"^/peanut": ""}
            }
        }
    }
}
