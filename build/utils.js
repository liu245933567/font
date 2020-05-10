const {resolve} = require('path');

module.exports = {
    pathResolve: p => resolve(__dirname, '../', p)
}