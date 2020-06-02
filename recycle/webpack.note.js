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
};

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
            })
        );
        Entries[file.name] = file.jsPath;
    });

    return {
        plugins: [
            ...htmlPlugins,
            new ExtractTextPlugin({
                filename: getPath => {
                    return getPath('css/[name].css');
                }
            })
        ],
        Entries
    };
};