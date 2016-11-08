// 关于速度与加速度的学习
import {Global} from './global';
import {utils} from './utils';
import {Ball} from './Balls';
let canvas = Global.canvas;
let ctx = Global.ctx;


 window.onload = function(){
   
    var ball = new Ball(10, '#CC9900');
    ball.x = canvas.width / 6;
    ball.y = canvas.height / 6;

    var ball2 = new Ball(10, '#FF0000');
    ball2.x = canvas.width / 6;
    ball2.y = canvas.height / 6 + 100;

    var ball3 = new Ball(10, '#FF0FF0');
    ball3.x = canvas.width / 6;
    ball3.y = canvas.height / 6 + 200;

    let vx1 = 0, vx2 = 0, ax = 0.1; //定义初始速度vx, 定义加速度a
    let ay = 0.05, vx3 = 0, vy3 = 0;
    (function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0,0,canvas.width,canvas.height);

        vx1 = 10 * ax;
        ball.x += vx1;
        ball.setText(ctx, '匀速');
        ball.draw(ctx);

        vx2 = vx2 + ax;//速度每一帧都加上加速度的值
        ball2.x += vx2;
        ball2.setText(ctx, '匀加速');
        ball2.draw(ctx);

        vx3 = 50 * ax;
        vy3 = vy3 + ay;
        ball3.x += vx3;
        ball3.y += vy3;
        ball3.setText(ctx, '抛物线');
        ball3.draw(ctx);
    }());
}
