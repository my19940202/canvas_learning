import {utils} from '../tools/utils';
class Box {
    constructor(width, height, color) {
        if (color === undefined) { color = "#ff0000";}
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.color = utils.parseColor(color);
        this.vx = 0;
        this.vy = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.lineWidth = 0;
        this.text = '';
        this.textSize = 12;
        this.textColor = '#CCC';
    }

    setText(context) {
        context.save();
        context.strokeStyle = this.textColor;
        context.fillStyle = this.textColor;
        context.font = 'italic ' + this.textSize + 'px sans-serif';
        context.textBaseline = 'top';
        //填充字符串
        if (!this.text) {
            this.text = '屌';
        }
        context.fillText(this.text, this.x, this.y);
        context.restore();
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.scale(this.scaleX, this.scaleY);
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.closePath();
        context.fill();
        if (this.lineWidth > 0) {
            context.stroke();
        }
        context.restore();
        this.setText(context)
    }
}

export {
    Box
}