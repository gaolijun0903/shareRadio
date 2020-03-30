let rootDir = "/Broadcast/";
console.log(`项目部署根目录：${rootDir}`);
console.log(`当前环境：${process.env.NODE_ENV}`);
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? rootDir : "/",
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: 8081,
        proxy: {
            "/": {
                target: "https://testing-broadcast-h5.yongche.org", // 需要跨域的目标url
                changeOrigin: true, // 将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                //ws: true,
                pathRewrite: {
                    "^/": '/'
                }
            }
        }
    }
};