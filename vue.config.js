let rootDir = "/radio/";
console.log(`项目部署根目录：${rootDir}`);
console.log(`当前环境：${process.env.NODE_ENV}`);
var path = require('path')
var express = require('express')
var proxy = require('http-proxy-middleware')
function resolve (dir) {
    return path.join(__dirname, dir)
}
function addStyleResource (rule) {

      rule.use('style-resource')
    
          .loader('style-resources-loader')
    
          .options({
    
            patterns:[
    
              path.resolve(__dirname, './src/styles/imports.styl'),
    
            ],
    
          })
    
    }
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
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
        config.resolve.alias
            .set('components', resolve('src/components'))
    }
};
