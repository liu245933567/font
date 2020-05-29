/**
 * 创建打包路径
 */
const createFiles = function () {
    const usePug = require('../config').usePug;
    const useTypeScript = require('../config').useTypeScript;
    const path = require('path');
    const glob = require('glob');
    const result = [];
    const type = usePug ? 'pug' : 'html';
    const scriptType = useTypeScript ? 'ts' : 'js';
    const files = glob.sync(path.join(__dirname, `../src/views/**/*.${type}`));
    for (file of files) {
        result.push({
            name: usePug ? file.match(/\w{0,}(?=\.pug)/)[0] : file.match(/\w{0,}(?=\.html)/)[0],
            templatePath: file,
            jsPath: file.replace(type, scriptType),
            stylePath: file.replace(type, 'stylus')
        });
    }
    return result;
};//欢迎加入前端全栈开发交流圈一起学习交流：864305860

const plugins = function () {
    const files = createFiles();
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const path = require('path');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');

    let htmlPlugins = [];
    let Entries = {};
    files.map(file => {
        htmlPlugins.push(
            new HtmlWebpackPlugin({
                filename: `${file.name}.html`,
                template: file.templatePath,
                chunks: [file.name]
            })//欢迎加入前端全栈开发交流圈一起学习交流：864305860
        );//面向1-3年前端人员
        Entries[file.name] = file.jsPath;
    });//帮助突破技术瓶颈，提升思维能力

    return {
        plugins: [
            ...htmlPlugins,
            new ExtractTextPlugin({
                filename: getPath => {
                    return getPath('css/[name].css');
                }
            })
        ],
        Entries//欢迎加入前端全栈开发交流圈一起学习交流：864305860
    };//面向1-3年前端人员
};//帮助突破技术瓶颈，提升思维能力