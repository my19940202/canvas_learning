import {Global} from '../global';
import {Ball} from '../tools/Balls';
import {utils} from '../tools/utils';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let ball = new Ball(50, "red");
    ball.text = '怼';
    ball.textSize = 50;
    ball.x = 100;
    ball.y = 100;
    ball.ax = 0;
    ball.ay = 0;

    
    let ballArr = [ball];
    let targetX = 0.5 * canvas.width;
    let targetY = 0.5 * canvas.height;
    let easing  = 0.05;
    let friction = 0.95;


    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('弹动的小球 点击选取新的振动中心', 0, 14);

        ballArr.map(function (ball) {
            // 简单弹动效果
            ball.ax = (targetX - ball.x) * easing;
            ball.ay = (targetY - ball.y) * easing;
            ball.vy += ball.ay;
            ball.vx += ball.ax;
            ball.vy *= friction;
            ball.vx *= friction;
            ball.y += ball.vy;
            ball.x += ball.vx;

            if (Math.abs(targetX - ball.x) < 1) {
                ball.x = targetX;
            }
            if (Math.abs(targetY - ball.y) < 1) {
                ball.y = targetY;
            }
            ball.draw(ctx);
        });
    }

    (function drawFramw(){
        oneFrame();
        let animReq = window.requestAnimationFrame(drawFramw, canvas);
    }());

    // click update target
    let mouse = utils.captureClickMouse(canvas);
    canvas.addEventListener('click', function (event) {
        ball.ax = 0;
        ball.ay = 0;
        ball.vx = 0;
        ball.vy = 0;
        targetX = mouse.x;
        targetY = mouse.y;
    }, false);
    let step = 100;
}
