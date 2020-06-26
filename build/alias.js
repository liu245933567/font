const { pathResolve } = require('./utils');

module.exports = {
  bootstrap: 'bootstrap/dist/css/bootstrap.css',
  src: pathResolve('src'),
  config: pathResolve('src/config/index.js'),
  utils: pathResolve('src/utils/index.js'),
  services: pathResolve('src/services'),
  // icon 图片路径
  icons: pathResolve('src/assets/icons'),
}