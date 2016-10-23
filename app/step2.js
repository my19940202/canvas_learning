import {Global} from './global';
let ctx = Global.ctx;

// drawImage(image,x,y)
// drawImage(image,x,y,w,h)
// drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
/*
sx:图像上的x坐标
sy:图像上的y坐标
sw:矩形区域的宽度
sh:矩形区域的高度
dx:画在canvas的x坐标
dy:画在canvas的y坐标
dw:画出来的宽度
dh:画出来的高度
*/

function drawImage() {
    var image = new Image();
    image.src = 'http://ww2.sinaimg.cn/large/6cca1403jw1f911svp46nj20i00d9mxy.jpg';
    ctx.fillStyle = '#CCC';
    ctx.fillRect(0, 0, 200, 200);
    image.onload = function () {
        // 0,0处绘制图片
        ctx.drawImage(image,0,0);
        // 指定绘制图片的宽高
        ctx.drawImage(image,100,500,228, 167);
        ctx.drawImage(image,0,0,200,200,330,500,228, 167);
    }
}
// drawImage();


// draw text
// 填充文字:context.fillText(text,x,y)
// 绘制文字轮廓 context.strokeText(text,x,y)
function drawText() {
    ctx.fillStyle = '#EEEEFF';
    ctx.fillRect(0,0,400,300);
    ctx.fillStyle = '#00f';
    ctx.font = 'italic 30px sans-serif';
    ctx.textBaseline = 'top';
    //填充字符串
    let txt="fill示例文字"
    ctx.fillText(txt, 0, 30);
    // ctx.strokeText(txt,0,100);

}
drawText();

let step2 = {};
export {
    step2
}
