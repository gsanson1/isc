ISC.Tower = function (game, x, y, type) {
    var towertype = 'tower_' + type;
    Phaser.Sprite.call(this, game, x, y, towertype);

    this.damage = parameters.towers[towertype].damage;
    this.distance = parameters.towers[towertype].distance;
    this.fireRate = parameters.towers[towertype].fireRate;
    this.type = type;

    game.add.existing(this);
};

ISC.Tower.prototype = Object.create(Phaser.Sprite.prototype);
ISC.Tower.prototype.constructor = ISC.Tower;

ISC.Tower.prototype.findTarget = function(_enemies) {

    var target = null;
    var dist =  this.distance;
    var newDist;

    for (var i = 0; i < _enemies.length; i++) {
        newDist = Tools.sqDist(this.x, this.y, _enemies[i].boatSprite.x, _enemies[i].boatSprite.y);
        if (newDist < dist) {
            dist = newDist;
            target = _enemies[i];
        }
    }

    return target;
}