/**
 * Created by gsanson on 04/06/2016.
 */

var Tools = {};

Tools.NORM_VECT = new Phaser.Point(0, 1);
Tools.ANGLE_DEC = Math.PI / 8.;
Tools.ANGLE_DIV = Math.PI / 4.;
Tools.ANGLE_MAX = Math.cos(Math.PI / 8.);

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
    var tiledPosition = this.getTiledPosition(position);
    var tiledX = (tiledPosition.x) << 6;
    var tiledY = (tiledPosition.y) << 6;

    return {x: tiledX, y: tiledY};
}

Tools.getGraphicPosition = function(tiledPosition) {
    var tiledX = (tiledPosition.x) << 6;
    var tiledY = (tiledPosition.y) << 6;

    return {x: tiledX, y: tiledY};
}

Tools.createArray = function(_width, _height, _val) {
    var val = _val | 0;
    var map = [];

    for (var i = 0; i < _width; i++) {
        map[i] = [];
        for (var j = 0; j < _height; j++) {
            map[i][j] = val;
        }
    }

    return map;
},

Tools.sqDist = function(_x1, _y1, _x2, _y2) {
    var dx = _x2 - _x1;
    var dy = _y2 - _y1;

    return dx * dx + dy * dy;
}

/**
 * Retourne une valeur entre 0 et 7 indiquant la direction du vecteur
 */
Tools.direction = function(_x1, _y1, _x2, _y2) {
    return Tools.dirVector(_x2 - _x1, _y2 - _y1);
}

Tools.dirVector = function(_vx, _vy) {
    var vector = new Phaser.Point(_vx, _vy);
    var angle = Phaser.Point.angle(vector, Tools.NORM_VECT);

    return 3 +  Math.round((angle + Tools.ANGLE_DEC) / Tools.ANGLE_DIV);
}

Tools.dirVector2 = function(_vx, _vy) {
    var dir = 0;

    if (_vx > 0) {
        if (_vx > Tools.ANGLE_MAX) {
            dir = 4;
        } else if (_vy > 0) {
            if (_vy > Tools.ANGLE_MAX) {
                dir = 6;
            } else {
                dir = 5;
            }
        } else {
            if (_vy < - Tools.ANGLE_MAX) {
                dir = 2;
            } else {
                dir = 3;
            }
        }
    } else {
        if (_vx < - Tools.ANGLE_MAX) {
            dir = 0;
        } else if (_vy > 0) {
            if (_vy > Tools.ANGLE_MAX) {
                dir = 6;
            } else {
                dir = 7;
            }
        } else {
            if (_vy < - Tools.ANGLE_MAX) {
                dir = 2;
            } else {
                dir = 1;
            }
        }
    }

    return dir;
}

Tools.rand = function(_maxExclusive, _minExclusive) {
    var min = _minExclusive | 0
    return Math.floor(Math.random() * (_maxExclusive - min)) + min;
}