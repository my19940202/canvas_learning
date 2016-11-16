import {Global} from '../global';
import {utils} from '../tools/utils';
import {Ball} from '../tools/Ball';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let ball = new Ball(20, "purple");
        ball.text = '垂直平滑';
        ball.x = 0;
        ball.y = 0;
        ball.textSize = 20;
        ball.vy = 1;
        ball.vx = 1;
    let ballArr = [ball];
    let angle = 0;
    let angleX = 0;
    let angleY = 0;

    let ball2 = new Ball(20, 'red');
        ball2.text = '脉冲';
        ball2.x = canvas.width / 2;
        ball2.y = canvas.height / 2;
        ball2.textSize = 20;

    let ball3 = new Ball(20, 'rgba(100, 200, 100, 0.8)');
        ball3.text = '乱飞的虫子';
        ball3.x = canvas.width / 2;
        ball3.y = canvas.height / 2;
        ball3.textSize = 20;

    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // canvas 内容主题
        ctx.fillStyle = '#000';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('三角函数的使用: 紫ball垂直平滑移动 ', 0, 0);
        ctx.fillText('三角函数的使用: 红ball脉冲运动 ', 0, 12);

        let index = 0;
        ballArr.map(function (ball) {
            ball.y = Math.floor(canvas.height / 2 + 100 * Math.sin(angle));
            ball.x += ball.vx;
            ball.draw(ctx);
            index++;
            if (ball.x > canvas.width) {
                ball.x = 0;
            }
        });

        // 脉冲运动的设置
        ball2.scaleX = ball2.scaleY = 1 + Math.sin(angle) * 4;
        ball2.draw(ctx);
        angle +=  0.04;

        // 虫子乱飞
        ball3.x = canvas.width / 2 + Math.sin(angleX) * 200;
        ball3.y = canvas.height / 2 + Math.sin(angleY) * 200;
        ball3.draw(ctx);
        angleX += 0.07 / 2;
        angleY += 0.11  / 2;
    }

    (function drawFramw(){
        oneFrame();
        window.requestAnimationFrame(drawFramw, canvas);
    }());

    
}
