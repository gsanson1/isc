/**
 * Created by gsanson on 04/06/2016.
 */

var Tools = {};

Tools.extendClass = function(_parent, _child) {
    var Surrogate = function() {};
    Surrogate.prototype = _parent.prototype;
    _child.prototype = new Surrogate();
    _child.prototype.constructor = _child;
}


Tools.sqDist = function(_x1, _y1, _x2, _y2) {
    var dx = _x2 - _x1;
    var dy = _y2 - _y1;

    return dx * dx + dy * dy;
}

