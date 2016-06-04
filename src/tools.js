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

