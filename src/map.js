/**
 * Created by gsanson on 04/06/2016.
 */

var Point = function(_x, _y) {
    this.x = _x | 0;
    this.y = _y | 0;
}


var Map = function(_width, _height, _dest) {
    this.array = this.createArray(_width, _height);

    if (_dest instanceof Array) {
        for (var i = 0; i < _dest.length; i++) {
            this.array[_dest[i].x][_dest[i].y] = 1;
        }

        this.startX = _dest[0].x;
        this.startY = _dest[0].y;
    } else {
        this.array[_dest.x][_dest.y] = 1;
        this.arrayComp = this.cloneArray(this.array);
        this.compute(this.arrayComp, _dest.x, _dest.y);

        this.startX = _dest.x;
        this.startY = _dest.y;
    }

    this.arrayComp = this.cloneArray(this.array);
    this.compute(this.arrayComp, this.startX, this.startY);
}

Map.prototype = {

    //DIRECTIONS : [new Point(-1, -1), new Point(-1, 0), new Point(-1, 1), new Point(0, -1), new Point(0, 1), new Point(1, -1), new Point(1, 0), new Point(1, 1)],
    DIRECTIONS : [new Point(1, 0), new Point(-1, 0), new Point(0, -1), new Point(0, 1)],

    canAddTower: function(_x, _y) {
        var can = false;

        if (this.array[_x][_y] == 0) {
            var newMap = this.cloneArray(this.array);
            newMap[_x][_y] = -1;
            this.compute(newMap, this.startX, this.startY);
            can = newMap[0][0] != 0;
        }

        if (_x == 0
            || _x == this.startX - 1 && _y == this.startY
            || _x == this.startX && _y == this.startY - 1
            || _x == this.startX && _y == this.startY + 1
            || _x == this.startX - 1 && _y == this.startY - 1
            || _x == this.startX - 1 && _y == this.startY + 1) {
            can = false;
        }

        return can;
    },

    addTower: function(_x, _y) {
        if (this.array[_x][_y] == 0) {
            this.array[_x][_y] = -1;

            this.arrayComp = this.cloneArray(this.array);
            this.compute(this.arrayComp, this.startX, this.startY);

            return true;
        }

        return false;
    },

    removeTower: function(_x, _y) {
        if (this.array[_x][_y] == -1) {
            this.array[_x][_y] = 0;

            this.arrayComp = this.cloneArray(this.array);
            this.compute(this.arrayComp, this.startX, this.startY);

            return true;
        }

        return false;
    },

    nextCell: function(_x, _y) {
        var width = this.arrayComp.length;
        var height = this.arrayComp[0].length;

        var best = 999;
        var bestDir;
        var newX;
        var newY;

        for (var i = 0; i < this.DIRECTIONS.length; i++) {
            newX = _x + this.DIRECTIONS[i].x;
            newY = _y + this.DIRECTIONS[i].y;

            if (newX >= 0 && newX < width && newY >= 0 && newY < height
                && this.arrayComp[newX][newY] != -1
                && this.arrayComp[newX][newY] < best) {
                    best = this.arrayComp[newX][newY];
                    bestDir = this.DIRECTIONS[i];
            }
        }

        return bestDir;
    },

    createArray: function(_width, _height, _val) {
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

    cloneArray: function(_map) {
        var newMap = [];

        for (var i = 0; i < _map.length; i++) {
            newMap[i] = [];
            for (var j = 0; j < _map[0].length; j++) {
                newMap[i][j] = _map[i][j];
            }
        }

        return newMap;
    },

    compute: function(_map, _x, _y) {
        var val = _map[_x][_y];
        var valCmp;

        var width = _map.length;
        var height = _map[0].length;

        // Top
        if (_y > 0) {
            valCmp = _map[_x][_y - 1];
            if (valCmp == 0 || valCmp > val + 1) {
                _map[_x][_y - 1] = val + 1;
                this.compute(_map, _x, _y - 1);
            } else if (valCmp != -1 && valCmp < val - 1) {
                _map[_x][_y] = valCmp + 1;
                this.compute(_map, _x, _y);
            }
        }

        // Bottom
        if (_y < height - 1) {
            valCmp = _map[_x][_y + 1];
            if (valCmp == 0 || valCmp > val + 1) {
                _map[_x][_y + 1] = val + 1;
                this.compute(_map, _x, _y + 1);
            } else if (valCmp != -1 && valCmp < val - 1) {
                _map[_x][_y] = valCmp + 1;
                this.compute(_map, _x, _y);
            }
        }

        // Left
        if (_x > 0) {
            valCmp = _map[_x - 1][_y];
            if (valCmp == 0 || valCmp > val + 1) {
                _map[_x - 1][_y] = val + 1;
                this.compute(_map, _x - 1, _y);
            } else if (valCmp != -1 && valCmp < val - 1) {
                _map[_x][_y] = valCmp + 1;
                this.compute(_map, _x, _y);
            }
        }

        // Bottom
        if (_x < width - 1) {
            valCmp = _map[_x + 1][_y];
            if (valCmp == 0 || valCmp > val + 1) {
                _map[_x + 1][_y] = val + 1;
                this.compute(_map, _x + 1, _y);
            } else if (valCmp != -1 && valCmp < val - 1) {
                _map[_x][_y] = valCmp + 1;
                this.compute(_map, _x, _y);
            }
        }
    },

    debug: function() {
        var width = this.arrayComp.length;
        var height = this.arrayComp[0].length;
        var cur;

        for (var j = 0; j < height; j++) {
            var str = '';
            for (var i = 0; i < width; i++) {
                if (i > 0) {
                    str += ':';
                }
                cur = '' + this.arrayComp[i][j];
                str += cur;
                if (cur.length == 1) {
                    str += ' ';
                }
            }
            console.log(str);
        }
    }

}