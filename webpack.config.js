var webpack = require('webpack');
var path = require('path');

var APP_PATH = path.resolve(__dirname, 'app');
var BUILD_PATH = path.resolve(__dirname, 'build');

//开发时文件缓存目录
var publicPath = '/';

var plugins = [];

//生产环境
if (process.argv.indexOf('-p') > -1) {
    //编译成生产版本
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
}

module.exports = {
    devServer: {
        // 0.0.0.0即绑定所有hosts
        host: '0.0.0.0',
        port: 8888,
        inline: true,
        progress: true,
        stats: {
            colors: true
        }
    },
    // externals:{
    //     'creajs':'window.creajs'
    // },
    entry: {
        index: APP_PATH + '/index',
        circle: APP_PATH + '/circle',
        speed_accelerate: APP_PATH + '/speed_accelerate',
        bounce_ball: APP_PATH + '/bounce_ball'

    },
    output: {
        publicPath,
        path: BUILD_PATH,
        //编译后的文件名字
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            include: APP_PATH,
            loader: 'babel'
        }, {
            // 详情页的样式
            test: /\.less/,
            include: APP_PATH,
            exclude: APP_PATH + '/entry',
            loader: 'style!css!less'
        }]
    },
    plugins: plugins,
    resolve: {
        //后缀名自动补全
        extensions: ['.js'],
        alias: {
        }
    }
};
