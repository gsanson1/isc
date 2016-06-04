/**
 * Created by gsanson on 04/06/2016.
 */

var Tools = {};

Tools.NORM_VECT = new Phaser.Point(0, 1);
Tools.ANGLE_DEC = Math.PI / 8.;
Tools.ANGLE_DIV = Math.PI / 4.;

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

/**
 * Retourne une valeur entre 0 et 7 indiquant la direction du vecteur
 */
Tools.direction = function(_x1, _y1, _x2, _y2) {
    var vect = new Phaser.Point(_x2 - _x1, _y2 - _y1);
    var angle = Phaser.Point.angle(vect, Tools.NORM_VECT);

    //console.log('direction=' + angle);
    return 3 +  Math.round((angle + Tools.ANGLE_DEC) / Tools.ANGLE_DIV);
}