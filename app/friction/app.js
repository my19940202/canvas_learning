import {Global} from '../global';
import {utils} from '../tools/utils';
import {Ball} from '../tools/Ball';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let ball = new Ball(20, "red");
       ball.x = canvas.width / 2
       ball.y = canvas.height / 2 - 200;
       
    let vy = 0,  //初始速度
        gravity = 0.1, //定义重力加速度
        bounce = -0.5; //定义反弹系数
    let ballArr = [ball];

    //碰撞检测
    function checkGround(ball) {
        if(ball.y + ball.radius > canvas.height){
           ball.y = canvas.height - ball.radius;
           ball.vy *= bounce; //速度反向并且减小
        }
        // 新增x轴方向的碰撞
        if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
            if(ball.x > canvas.width / 2) {
                ball.x = canvas.width - ball.radius;
            }
            else ball.x = ball.radius;

            ball.vx *= bounce; //速度反向并且减小
        }
    }

    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('敲击键盘生成小球', 0, 14);
        ctx.fillText('已经绘制了' + ballArr.length +'个小球', 0, 28);

        ballArr.map(function (ball) {
            // 简单添加了摩擦力的效果
            ball.vx *= 0.99;
            ball.vy *= 0.99;
            ball.y += ball.vy;
            ball.x += ball.vx;
            //碰撞检测
            checkGround(ball);
            ball.draw(ctx);
        });
    }

    (function drawFramw(){
        oneFrame();
        window.requestAnimationFrame(drawFramw, canvas);
    }());

    // click to new ball
    window.addEventListener('keydown', function (event) {
        let ballBgColor = '#' + Math.floor((Math.random() * 16777215)).toString(16);
        let randomBallRadius = 20;
        let randomBall = new Ball(randomBallRadius, ballBgColor);
        randomBall.x = Math.random() * canvas.width;
        randomBall.y = 0;
        randomBall.vx = 5;
        randomBall.vy = 5;
        ballArr.push(randomBall);
    }, false);
}
