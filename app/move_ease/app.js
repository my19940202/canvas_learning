import {Global} from '../global';
import {utils} from '../tools/utils';
import {Ball} from '../tools/Balls';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let ball = new Ball(50, "red");
    ball.text = '怼';
    ball.textSize = 50;
    ball.x = 20;
    ball.y = 20;
    
    let bounce = -0.5; //定义反弹系数
    let ballArr = [ball];

    let targetX = 0.7 * canvas.width;
    let targetY = 0.7 * canvas.height;
    let easing  = 0.05;

    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('通过方向键和鼠标点击移动小球', 0, 14);
        ctx.fillText('已经绘制了' + ballArr.length +'个小球', 0, 28);

        ballArr.map(function (ball) {
            // 简单缓动效果
            ball.vx = (targetX - ball.x) * easing;
            ball.vy = (targetY - ball.y) * easing;
            ball.y += ball.vy;
            ball.x += ball.vx;
            // 可能出现小球永远到不了 target坐标的情况 需要在距离小于1px时 直接设置成target坐标
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

    // click to new ball
    let mouse = utils.captureClickMouse(canvas);
    canvas.addEventListener('click', function (event) {
        targetX = mouse.x;
        targetY = mouse.y;
    }, false);
    let step = 100;
    window.addEventListener('keydown', function (event) {
        switch(event.keyCode) {
            case 37:
                targetX -= step;
                break;
            case 38:
            targetY -= step;
                break;
            case 39:
                targetX += step;
                break;
            case 40:
                targetY += step;
                break;
        };
    }, false);
}
