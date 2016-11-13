import {utils} from './utils';

class Ball {
    constructor(radius,color) {
        if(radius === undefined) {radius = 40;}
        if(color === undefined){color = '#00ff00';}
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.rotation = 0;
        this.mass = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.name = "";
        this.color = utils.parseColor(color);
        this.lineWidth = 1;
        this.text = '';
        this.textSize = 12;
    }

    setText(context) {
        context.save();
        context.strokeStyle = "#fff";
        context.font = 'italic ' + this.textSize + 'px sans-serif';
        context.textBaseline = 'top';
        //填充字符串
        if (!this.text) {
            this.text = '屌';
        }
        context.strokeText(this.text, this.x - this.radius / 2, this.y - this.radius / 2);
        context.restore();
    }

    draw(context) {
        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.rotation);
        context.scale(this.scaleX,this.scaleY);
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(0,0,this.radius,0,Math.PI*2,false);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
        this.setText(context);
    }

    getBounds() {
        let me = this;
        return {
            x: me.x - me.radius,
            y: me.y - me.radius,
            width: me.radius * 2,
            height: me.radius * 2
        };
    }
}

export {
    Ball
}