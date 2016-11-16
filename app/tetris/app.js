import {Global} from '../global';
import {utils} from '../tools/utils';
import {Box} from '../tools/Box';
let canvas = Global.canvas;
let ctx = Global.ctx;

window.onload = function(){
    let activebox = new Box(100, 100);
    activebox.x = 0;
    activebox.y = 0;
    activebox.bottomPos = canvas.height;
    activebox.textSize = 20;
    activebox.textColor = '#FFF';
       
    let gravity = 0.2,
    bounce = -0.5;
    let boxArr = [activebox];
    activebox.draw(ctx)
    //碰撞检测
    function checkGround(obj) {
        if(obj.y + obj.height >= obj.bottomPos) {
           obj.y = obj.bottomPos - obj.height;
           obj.vy *= bounce;
        }
    }

    let createBox = function () {
        let size = Math.floor(Math.random() * 100);
        activebox = new Box(size, size);
        activebox.textSize = size;
        activebox.y = 0;
        activebox.bottomPos = canvas.height;
        activebox.y = 0;
        activebox.x = Math.floor(Math.random() * (canvas.width - size));
        boxArr.push(activebox);
    };

    // 帧绘制
    function oneFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = 'italic 14px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText('俄罗斯方块测试', 0, 4);
        boxArr.map(function (val) {
            val.vy += gravity;
            val.y += val.vy;
            if (val === activebox) {
                // 处理接触到bottom的box
                if (Math.abs(val.y + val.height - canvas.height) <= 1 && Math.abs(val.vy) <= 0.2) {
                    val.y = canvas.height - val.height;
                    val.vy = 0;
                    // 静止后再new Box
                    createBox();
                }
            }
            else {
                if (utils.intersects(val, activebox)) {
                    activebox.y = val.y - activebox.height;
                    activebox.vy *= bounce;
                    activebox.bottomPos = activebox.y + activebox.height;
                    createBox();
                }
            }
            checkGround(val);
            val.draw(ctx);
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
}
