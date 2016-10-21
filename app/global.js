let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let Global = {
    ctx,
    doc: document,
    selectAll: function (name) {
        return document.querySelectorAll(name);
    },
    select: function (name) {
        return document.querySelectorAll(name);
    }
}

export {
    Global
};
