// let myCreatejs = require('../bower_components/EaselJS/lib/easeljs-0.8.2.combined.js');
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
};

export {
    Global
};
