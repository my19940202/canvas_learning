import {Global} from './global';
import {utils} from './utils';
import {Ball} from './Balls';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let ball = new Ball(20, "red");
       ball.x = canvas.width / 2
       ball.y = canvas.height / 2 - 200;
       
    let vy = 0,  //初始速度
        gravity = 0.1, //定义重力加速度
        bounce = -0.8; //定义反弹系数
    let ballArr = [ball];
    let ballWords = '蓝瘦香菇双11买买买明天吃什么好论如何找妹子哈哈哈我想起了我逝去的青春我要妹子呀';
    ballWords = '光棍节快乐';


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
        ctx.fillText('跳动的球,点击以及按住拖动产生小球', 0, 0);
        ctx.fillText('已经绘制了' + ballArr.length +'个小球', 0, 14);
        ctx.fillText('手机端的canvas性能不好呀，文字好糊', 0, 28);

        let index = 0;
        ballArr.map(function (ball) {
            ball.vy += gravity;
            ball.y += ball.vy;
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
    let mouseClickPos = utils.captureClickMouse(canvas);
    canvas.addEventListener('click',function(event) {
        let ballBgColor = '#' + Math.floor((Math.random() * 16777215)).toString(16);
        let randomBall = new Ball(20, ballBgColor);
        randomBall.x = mouseClickPos.x;
        randomBall.y = mouseClickPos.y;
        randomBall.text = 
        ballArr.push(randomBall);
    }, false);

    let mouseMousePos = utils.captureMouse(canvas);
    let mousemoveCount = 0;
    canvas.addEventListener('mousemove',function(event) {
        mousemoveCount++;
        if (mousemoveCount % 5 !== 0) return;
        // console.log(mouseMousePos)
        let ballBgColor = '#' + Math.floor((Math.random() * 16777215)).toString(16);
        let randomBall = new Ball(20, ballBgColor);
        randomBall.x = mouseMousePos.x;
        randomBall.y = mouseMousePos.y;
        randomBall.text = 
        ballArr.push(randomBall);
    }, false);

    // 手机端处理
    let touchMouse = utils.captureTouch(canvas);
    canvas.addEventListener('touchmove',function(event) {
        mousemoveCount++;
        if (mousemoveCount % 5 !== 0) return;
        let ballBgColor = '#' + Math.floor((Math.random() * 16777215)).toString(16);
        let randomBall = new Ball(20, ballBgColor);
        randomBall.x = touchMouse.x;
        randomBall.y = touchMouse.y;
        randomBall.text = ballWords[Math.floor(Math.random() * ballWords.length)];
        ballArr.push(randomBall);
    }, false);
}
