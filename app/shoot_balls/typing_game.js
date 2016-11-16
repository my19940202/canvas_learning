import {Global} from '../global';
import {utils} from '../tools/utils';
import {Ball} from '../tools/Ball';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let ball = new Ball(20, "red");
       ball.x = canvas.width / 2
       ball.y = canvas.height / 2 - 200,
       ball.text = 'X';
       
    let vy = 0,  //初始速度
        gravity = 0.1, //定义重力加速度
        bounce = -0.7; //定义反弹系数
    let ballArr = [ball];

    let score = 0;

    //碰撞检测
    function checkGround(ball) {
        if(ball.y + ball.radius > canvas.height){
           ball.y = canvas.height - ball.radius;
           ball.vy *= bounce; //速度反向并且减小
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
        ctx.fillText('已经消除了' + score +'个小球', 0, 42);

        let index = 0;
        ballArr.map(function (ball) {
            ball.vy += gravity;
            ball.y += ball.vy;
            ball.x += ball.vx;
            //碰撞检测
            checkGround(ball);
            // 如果有些圆已经静止 就不绘制
            if (
                ball.y === canvas.height - ball.radius
                && Math.round(ball.vy) == 0
                ) {
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
    
    // 键盘敲击 remove掉小球
    window.addEventListener('keydown', function (event) {
        let index = 0;
        ballArr.map(function (ball) {
            if (ball.text == event.key.toUpperCase()) {
                ballArr.splice(index, 1);
                score += 1;
            }
            index++;
        });
    }, false);

    let randomWord = function () {
        let randomWords = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let idx = Math.floor(Math.random() * (randomWords.length - 1));
        return randomWords[idx];
    };
    let timer = setInterval(function() {
        let ballBgColor = '#' + Math.floor((Math.random() * 16777210)).toString(16);
        let randomBallRadius = 20;
        let randomBall = new Ball(randomBallRadius, ballBgColor);
        randomBall.x = Math.floor((Math.random() * (canvas.width - randomBallRadius)));
        randomBall.y = 0;
        // randomBall.vx = 5;
        randomBall.text = randomWord();
        randomBall.textSize = randomBallRadius;
        ballArr.push(randomBall);
    }, 1000)
}
