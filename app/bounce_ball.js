import {Global} from './global';
import {utils} from './tools/utils';
import {Ball} from './tools/Balls';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let ball = new Ball(20, "red");
       ball.x = canvas.width/2
       ball.y = canvas.height/2 - 200;
       
    let vy = 0,  //初始速度
        gravity = 0.2, //定义重力加速度
        bounce = -0.9; //定义反弹系数
        
    //碰撞检测
    function checkGround(ball){
       if(ball.y + ball.radius > canvas.height){
           ball.y = canvas.height - ball.radius;
           vy *= bounce; //速度反向并且减小
       }
    }

    (function drawFramw(){
      window.requestAnimationFrame(drawFramw, canvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      vy += gravity;
      ball.y += vy;
      
      //碰撞检测
      checkGround(ball);
      ball.draw(ctx);
    }());
}

// click to new ball
// let bodyDom = document.body;
// bodyDom.onclick = function () {
//     console.log('fasasdf')
//     let ballX = Math.floor(Math.random() * canvas.width);
//     let ballY = 100;
//     let randomBall = new Ball(20,'blue');
//     randomBall.x = ballX;
//     randomBall.y = ballY;
//     randomBall.draw(ctx);
// };