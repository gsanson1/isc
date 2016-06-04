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

Tools.getTiledPosition = function(position) {
    var tiledX = position.x >> 6;
    var tiledY = position.y >> 6;

    return {x: tiledX, y: tiledY};
}

Tools.getTiledGraphicPosition = function(position) {
    var tiledGraphicPosition = this.getTiledPosition(position);
    var tiledX = (tiledGraphicPosition.x) << 6;
    var tiledY = (tiledGraphicPosition.y) << 6;

    return {x: tiledX, y: tiledY};
}

Tools.getGraphicPosition = function(tiledPosition) {
    var tiledX = (tiledPosition.x) << 6;
    var tiledY = (tiledPosition.y) << 6;

    return {x: tiledX, y: tiledY};
}

Tools.sqDist = function(_x1, _y1, _x2, _y2) {
    var dx = _x2 - _x1;
    var dy = _y2 - _y1;

    return dx * dx + dy * dy;
}
