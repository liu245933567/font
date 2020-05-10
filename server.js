const express = require("express");
const webpack = require('webpack');
const middle = require("webpack-dev-middleware");

const config = require('./webpack.config');

const compiler = webpack(config);

const app = express();
app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.json({ name: '五位在齐鲁' })
})

app.listen(8000);