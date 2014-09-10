module.exports = Clip;

function Clip (opts) {
    if (!(this instanceof Clip)) return new Clip(opts);
    this.set(opts);
}

Clip.prototype.set = function (opts) {
    var self = this;
    Object.keys(opts).forEach(function (key) {
        self[key] = opts[key];
    });
    self._draw();
};

Clip.prototype.load = function (elem) {
    this.element = elem;
    this._draw();
};

Clip.prototype._draw = function () {
    if (!this.element) return;
};
