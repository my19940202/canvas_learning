import {Global} from '../global';
import {utils} from '../tools/utils';
import {Box} from '../tools/Box';
import {Ball} from '../tools/Ball';
import {Line} from '../tools/Line';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let activebox = new Box(50, 50);
    let moveRadius = 100;
    let angle = 0;
    let gravity = 0.4;
    let bounce = -0.8;
    let friction = 0.995;
    let boxArr = [activebox];
    activebox.x = canvas.width / 2 + moveRadius;
    activebox.y = canvas.height / 2 - 100;
    activebox.bottomPos = canvas.height;
    activebox.textSize = 40;
    activebox.textColor = '#FFF';
    activebox.draw(ctx);

    // 斜面反弹
    let line = new Line(0, 0, canvas.width / 2, 0);
    line.x = canvas.width / 4;
    line.y = canvas.height / 2;
    line.rotation = 10 * Math.PI / 180;
    let ball = new Ball(20, "red");
    ball.x = canvas.width / 2;
    ball.y = ball.radius;
    let cos = Math.cos(line.rotation);
    let sin = Math.sin(line.rotation);

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

        if (ball.y + ball.radius >= canvas.height) {
            ball.y = -ball.radius + canvas.height;
            ball.vy *= bounce;
        }
        ball.vx *= friction;
        ball.vy *= friction;
    }


    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('旋转测试和斜面反弹', 0, 4);
        boxArr.map(function (val) {
            val.y = canvas.width / 2 + moveRadius * Math.sin(angle);
            val.x = canvas.width / 2 + moveRadius * Math.cos(angle);
            val.draw(ctx);
        });
        angle += 0.01;
        ball.vy += gravity;
        ball.y += ball.vy;
        ball.x += ball.vx;

        // 下面是核心代码
        // 获取球相对于的line的坐标
        let x1 = ball.x - line.x;
        let y1 = ball.y - line.y;
        let y2 = cos * y1 - sin * x1;
        
        // 处理小球离开斜面时的自由落体运动
        if (utils.intersects(ball.getBounds(), line.getBounds())) {
            // 斜面反弹 考虑球的大小
            if (y2 > -ball.radius) {
                // 坐标旋转
                let x2 = cos * x1 + sin * y1,
                vx1 = cos * ball.vx + sin * ball.vy,
                vy1 = cos * ball.vy - sin * ball.vx;

                y2 = -ball.radius;
                vy1 *= bounce;
                
                // 再次旋转  恢复成xy
                x1 = cos * x2 - sin * y2;
                y1 = cos * y2 + sin * x2;
                ball.vx = cos * vx1 - sin * vy1;
                ball.vy = cos * vy1 + sin * vx1;
                ball.x = line.x + x1;
                ball.y = line.y + y1;
            }
        }
        else {
            checkBorder(ball);
        }
        ball.draw(ctx);
        line.draw(ctx);
    }

    (function drawFramw(){
        oneFrame();
        window.requestAnimationFrame(drawFramw, canvas);
    }());
}
