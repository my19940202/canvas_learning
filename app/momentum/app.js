import {Global} from '../global';
import {utils} from '../tools/utils';
import {Ball} from '../tools/Ball';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    
    let moveRadius = 100;
    let angle = 0;
    let gravity = 0.4;
    let bounce = -1;
    let friction = 0.995;

    let ball3Mass = Math.floor(Math.random() * 90) + 10;
    let ball3 = new Ball(ball3Mass, "orange");
    ball3.x = ball3.radius;
    ball3.y = canvas.height / 2;
    ball3.text = '3';
    ball3.mass = ball3Mass;
    ball3.vx = 5;

    let ball4Mass = Math.floor(Math.random() * 90) + 10;
    let ball4 = new Ball(ball4Mass, "purple");
    ball4.x = canvas.width - ball4.radius;
    ball4.y = canvas.height / 2;
    ball4.text = '4';
    ball4.mass = ball4Mass;
    ball4.vx = -3;

    // 先测试单轴撞击
    let boxArr = [ball3, ball4];
    
    // 边缘撞击检测
    let checkBorder = function (ball) {
        if (ball.x + ball.radius >= canvas.width) {
            ball.x = -ball.radius + canvas.width;
            ball.vx *= bounce;
        }
        if (ball.x - ball.radius <= 0) {
            ball.x = ball.radius;
            ball.vx *= bounce;
        }
        ball.x += ball.vx;
    };

    // 
    let getHitV = function (ballA, ballB) {
        let filnalV = (ballA.vx * (ballA.mass - ballB.mass) + 2 * ballB.mass * ballB.vx ) / (ballA.mass + ballB.mass);
        return filnalV;
    };


    // 单轴撞击
    let xhitTest = function () {
        let distance = ball3.x - ball4.x;
        if (Math.abs(distance) < (ball3.radius + ball4.radius)) {
            // 使用动量守恒
            let vx3Hitted = getHitV(ball3, ball4);
            let vx4Hitted = getHitV(ball4, ball3);
            // 刚才我直接试了 会导致计算出错误的数值  感觉应是遇到js 语言上的问题
            /*
            ball3.vx = getHitV(ball3, ball4);
            ball4.vx = getHitV(ball4, ball3);
            */

            ball3.vx = vx3Hitted;
            ball4.vx = vx4Hitted;
            ball3.x += ball3.vx;
            ball4.x += ball4.vx;
        }
    };


    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        let E3 = 0.5 * ball3.mass * ball3.vx * ball3.vx;
        let E4 = 0.5 * ball4.mass * ball4.vx * ball4.vx;
        let Eall = E3 + E4;
        let ball3Str = '3号球的动能:' + E3 + ', 速度：' + ball3.vx;
        let ball4Str = '4号球的动能:' + E4 + ', 速度：' + ball4.vx;
        ctx.fillText('动量守恒', 0, 0);
        ctx.fillText(ball3Str, 0, 14);
        ctx.fillText(ball4Str, 0, 14 * 2);
        ctx.fillText('总动能:' + Eall, 0, 14 * 3);

        boxArr.map((val) => {
            val.x += val.vx;
            val.draw(ctx);
            checkBorder(val);
        });
        xhitTest();
    }

    (function drawFramw(){
        oneFrame();
        window.requestAnimationFrame(drawFramw, canvas);
    }());
}
