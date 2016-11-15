import {Global} from '../global';
// import {utils} from '../tools/utils';
import {Box} from '../tools/Box';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let box = new Box(20, 20);
    box.x = 0;
    box.y = 0;
    box.textSize = 20;
    box.textColor = '#FFF';
       
    let gravity = 0.2,
    bounce = -0.5;
    let boxArr = [box];
    box.draw(ctx)
    //碰撞检测
    function checkGround(obj) {
        if(obj.y + obj.height >= canvas.height){
           obj.y = canvas.height - obj.height;
           obj.vy *= bounce;
        }
    }

    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('俄罗斯方块测试', 0, 4);

        boxArr.map(function (val) {
            box.vy += gravity;
            box.y += box.vy;
            if (Math.abs(box.y + box.height - canvas.height) <= 1 && box.vy == 0) {
                box.y = canvas.height - obj.height;
            }

            checkGround(box);
            box.draw(ctx);
        });
    }

    (function drawFramw(){
        oneFrame();
        window.requestAnimationFrame(drawFramw, canvas);
    }());

    window.addEventListener('keydown', function (event) {
        switch(event.keyCode) {
            case 37:
                console.log('left')
                break;
            case 39:
                console.log('right')
                break;
        };
    }, false);

    // setInterval(function () {
    //     let box = new Box(20, 20);
    //     box.x = Math.floor(Math.random() * (canvas.width - box.width));
    //     box.y = 100;
    //     box.textSize = 20;
    //     box.textColor = 'red';
    //     boxArr.push(box);
    // }, 1000)
}
