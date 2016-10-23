// createjs创建一个简单的贪吃蛇
import {Global} from './global';
let ctx = Global.ctx;
const canvasSize = {
    width: 800,
    height: 800
};

//创建一个舞台，得到一个参考的画布
let stage = new createjs.Stage("myCanvas");
//创建一个形状的显示对象
let rect = new createjs.Shape();
rect.graphics.beginFill("blue").drawRect(0, 0, 40, 40);
let circle = new createjs.Shape();
circle.graphics.beginFill('red').drawCircle(-10, -10, 20);
stage.addChild(circle);
//形状实例的设置位置
rect.x = rect.y = 50;
//添加形状实例到舞台显示列表
stage.addChild(rect);
//更新舞台将呈现下一帧
stage.update();



let direct = 'right';
let moveOneStep = function () {
    let moveStep = 2;
    switch (direct) {
        case 'left':
            if (rect.x > 0) {
                rect.x -= moveStep;
            }
            break;

        case 'right':
            if (rect.x < canvasSize.width - 40) {
                rect.x += moveStep;
            }
            break;

        case 'top':
            if (rect.y > 0) {
                rect.y -= moveStep;
            }
            break;

        case 'down':
            if (rect.y < canvasSize.height - 40) {
                rect.y += moveStep;
            }
            break;
    }
    stage.update();
};

let timer = setInterval(function () {
    moveOneStep();
}, 10);
let setDiret = function (param) {
    direct = param;
};

let generateFruit = function () {
    let fruitX = Math.floor(Math.random() * 800);
    let fruitY = Math.floor(Math.random() * 800);
    circle.x = fruitX;
    circle.y = fruitY;
    stage.update();
};

let fruitTimer = setInterval(generateFruit, 1000);



document.onkeydown = function (event) {  
    var isie = (document.all) ? true:false;
    var key;
    if (isie) {
        key = event.keyCode;
    } else {
        key = event.which;
    }
    if(key == 37){
        setDiret('left');
        console.log('left');
    }
    if(key == 38){
        setDiret('top');
        console.log('top');
    }
    if(key == 39){
        setDiret('right');
        console.log('right');
    }
    if(key == 40){
        setDiret('down');
        console.log('down');
    }
}



let step3 = {};
export {
    step3
}
