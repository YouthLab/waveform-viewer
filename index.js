var WFD = require('waveform-data');
var createElement = require('svg-create-element');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

module.exports = WF;
inherits(WF, EventEmitter);

function WF (opts) {
    var self = this;
    if (!(this instanceof WF)) return new WF(opts);
    this.width = 800;
    this.height = 100;
    this.samples = 100;
    
    this.element = createElement('svg', {
        width: this.width,
        height: 100,
        class: 'waveform'
    });
    var g = this.group = createElement('g', {
        fill: 'cyan',
        stroke: 'transparent'
    });
    this.element.appendChild(this.group);
    
    this.fontSize = 15;
    var txt = createElement('text', {
        x: 0,
        y: this.fontSize,
        fontFamily: 'pixel',
        fontSize: this.fontSize,
        fill: 'cyan',
        stroke: 'transparent'
    });
    txt.textContent = opts.label || '';
    this.element.appendChild(txt);
    
    var rect = createElement('rect', {
        width: this.width,
        height: this.height,
        fill: 'transparent',
        stroke: 'transparent'
    });
    rect.addEventListener('mouseover', function (ev) {
        g.setAttribute('fill', 'magenta');
        txt.setAttribute('fill', 'white');
    });
    rect.addEventListener('mouseout', function (ev) {
        g.setAttribute('fill', 'cyan');
        txt.setAttribute('fill', 'cyan');
    });
    rect.addEventListener('click', function (ev) {
        self.emit('click', ev);
    });
    this.element.appendChild(rect);
}

WF.prototype.load = function (data) {
    var wf = WFD.create(data);
    for (var i = 0; i < this.samples; i++) {
        var ix = Math.floor(i / this.samples * wf.max.length);
        
        var ymin = (wf.min[ix] + 128) / 256 * (this.height - this.fontSize);
        var ymax = (wf.max[ix] + 128) / 256 * (this.height - this.fontSize);
        var h = (ymax + ymin) / 2;
        
        var rect = createElement('rect', {
            x: i / this.samples * this.width,
            y: this.height / 2 - h / 2 + this.fontSize / 2,
            width: 1 / this.samples * this.width,
            height: Math.max(h, 10)
        });
        this.group.appendChild(rect);
    }
};

WF.prototype.appendTo = function (target) {
    if (typeof target === 'string') target = document.querySelector(target);
    target.appendChild(this.element);
    return this;
};
