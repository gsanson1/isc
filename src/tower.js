ISC.Tower = function (game, x, y, type) {
    var towertype = 'tower_' + type;
    Phaser.Sprite.call(this, game, x, y, towertype);

    this.damage = parameters.towers[towertype].damage;
    this.distance = parameters.towers[towertype].distance;
};

ISC.Tower.prototype = Object.create(Phaser.Sprite.prototype);
ISC.Tower.prototype.constructor = ISC.Tower;

