let a = 'afdadf';
let b = `----${a}----`;
class FE {
    constructor(name) {
        this.name = name || 'fuck';
        this.girlFriend = null;
    }
    say() {
        console.log(`${this.name}'s girlFriend is ${this.girlFriend}`);
    }
}
let xsb = new FE('xishengbo');
xsb.say();