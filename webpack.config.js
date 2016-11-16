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
    entry: {
        index: APP_PATH + '/index',
        circle: APP_PATH + '/circle',
        speed_accelerate: APP_PATH + '/speed_accelerate',
        //ball相关的实践
        bounce_ball: APP_PATH + '/bounce_ball',
        more_ball: APP_PATH + '/more_ball',
        shoot_balls: APP_PATH + '/shoot_balls/app',
        // 打字游戏
        typing_game: APP_PATH + '/shoot_balls/typing_game',
        // 三角函数相关操作
        sin_cos: APP_PATH + '/trigonometry/app',
        // 关于摩擦力的操作
        friction: APP_PATH + '/friction/app',
        // 缓动和弹动
        move_ease: APP_PATH + '/move_ease/app',
        move_spring: APP_PATH + '/move_ease/move_spring',
        // 俄罗斯游戏的实现
        tetris: APP_PATH + '/tetris/app',
        // 俄罗斯游戏的实现
        rotate: APP_PATH + '/rotate/app',
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
