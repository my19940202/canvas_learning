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
        // canvas 内容主题
        ctx.fillStyle = '#000';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('敲击键盘生成小球', 0, 14);
        ctx.fillText('已经绘制了' + ballArr.length +'个小球', 0, 28);

        let index = 0;
        ballArr.map(function (ball) {
            ball.vy += gravity;
            ball.vx *= 0.996;
            ball.y += ball.vy;
            ball.x += ball.vx;
            //碰撞检测
            checkGround(ball);
            // 如果有些圆已经静止 就不绘制
            if (ball.vy === 0 && ball.y ===  canvas.height - ball.radius) {
                ballArr.splice(index, 1);
            }
            ball.draw(ctx);
            index++;
        });
    }

    (function drawFramw(){
        oneFrame();
        window.requestAnimationFrame(drawFramw, canvas);
    }());

    // click to new ball
    let bodyDom = document.body; 
    
    // 键盘点击事件的绑定
    window.addEventListener('keydown', function (event) {
        let ballBgColor = '#' + Math.floor((Math.random() * 16777215)).toString(16);
        let randomBallRadius = 20;
        let randomBall = new Ball(randomBallRadius, ballBgColor);
        randomBall.x = randomBallRadius;
        randomBall.y = randomBallRadius;
        randomBall.vx = 5;
        randomBall.text = (event.key || 'o').toUpperCase();
        randomBall.textSize = randomBallRadius;
        ballArr.push(randomBall);
    }, false);
}
