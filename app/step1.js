import {Global} from './global'
let ctx = Global.ctx;
// 参考文章地址
// http://www.cnblogs.com/tim-li/archive/2012/08/06/2580252.html#1
// rectangle
// context.fillRect(x,y,width,height)
// strokeRect(x,y,width,height)
ctx.fillStyle = '#CC99BB';
let fillRectConf = [100, 0, 100, 100];
let strokeRectConf = [100, 100, 100, 100];
// 绘制
function rectDraw() {
    ctx.fillRect(...fillRectConf);
    ctx.strokeRect(...strokeRectConf);
}

// 清除
function rectClear() {
    // strokeRect 相当于在原有基础上画一个border
    // clear的时候需要考虑border
    strokeRectConf[0] -= 1
    strokeRectConf[2] += 2
    strokeRectConf[3] += 1
    ctx.clearRect(...fillRectConf)
    ctx.clearRect(...strokeRectConf)
}

// 圆弧
// context.arc(x, y, radius, starAngle,endAngle, anticlockwise)
let arcConf = [200, 150, 100, 0, Math.PI, true];
let context = ctx;
function arcDraw() {
    ctx.beginPath();
    ctx.arc(100, 150, 50, 0, Math.PI/2 , false);
    ctx.fillStyle = 'rgba(255,0,0,0.25)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,0,0,0.25)'
    ctx.closePath();
    ctx.stroke();

    // context.beginPath();
    ctx.arc(300, 150, 50, 0, Math.PI/2 , false);
    ctx.fillStyle = 'rgba(255,0,0,0.25)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,0,0,0.25)';
    ctx.closePath();
    ctx.stroke();
}
arcDraw();
// console.log('------')


// event bind
let drawDom = Global.select('#step1_draw')[0];
let clearDom = Global.select('#step1_clear')[0];
drawDom.onclick = rectDraw;
clearDom.onclick = rectClear;

let step1 = {};
export {
    step1
}
