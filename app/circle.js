// 利用arc 画circle
import {Global} from './global'
let canvas = Global.canvas;
let ctx = Global.ctx;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// 圆环之间的距离
let arcGap = 20;
let oneCircle = function (radius, index, offset) {
    let arcConf = [centerX, centerY, radius, 0, Math.PI * 2, true];
    let arcColor = '#000';
    if (index % 2) {
        arcColor = '#FFF';
    }
    if (offset) {
        arcConf[2] += offset;
    }
    ctx.beginPath();
    ctx.lineWidth = arcGap;
    ctx.arc(...arcConf);
    ctx.strokeStyle = arcColor;
    ctx.closePath();
    ctx.stroke();
};

let drawAllCircle = function (offset) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let radius = 380, index= 0; radius > 0; radius = radius - arcGap, index++) {
        oneCircle(radius, index, offset)
    }
};

let offset = 0;
let direct = 1;
(function drawFrame(){
    drawAllCircle(offset);
    if (offset > 100 || offset < 0) {
        direct = !direct;
    }
    if (direct) {
        offset++;
    }
    else {
        offset--;
    }
    window.requestAnimationFrame(drawFrame, canvas);
}());
