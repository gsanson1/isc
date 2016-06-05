ISC.Tower = function (game, x, y, type) {
    var towertype = 'tower_' + type;

    Phaser.Sprite.call(this, game, x, y, towertype);

    this.damage = parameters.towers[towertype].damage;
    this.distance = parameters.towers[towertype].distance;
    this.fireRate = parameters.towers[towertype].fireRate;
    this.cost = parameters.towers[towertype].cost;
    this.recycle = parameters.towers[towertype].recycle;

    this.type = type;

    this.showFire = 0;
    this.fireSprite = game.add.sprite(x, y, 'fx_' + type);
    this.fireSprite.visible = false;

    game.add.existing(this);

    this.nextFire = 0;
    this.dead = false;
};

ISC.Tower.prototype = Object.create(Phaser.Sprite.prototype);
ISC.Tower.prototype.constructor = ISC.Tower;

ISC.Tower.prototype.findTarget = function(_enemies) {

    var target = null;
    var dist =  this.distance;
    var newDist;
    var direction = 0;

    for (var i = 0; i < _enemies.length; i++) {
        newDist = Tools.sqDist(this.x, this.y, _enemies[i].boatSprite.x, _enemies[i].boatSprite.y);
        if (newDist < dist) {
            dist = newDist;
            target = _enemies[i];
        }
    }

    if (target) {
        direction = Tools.direction(this.x, this.y, target.boatSprite.x, target.boatSprite.y);
        this.frame = direction;

        this.fireSprite.visible = true;
        this.showFire = 5;

        // TODO : Son de tir
    }

    return { enemy: target, direction: direction };
}

ISC.Tower.prototype.refresh = function() {
    if (this.showFire > 0) {
        this.fireSprite.frame = this.frame;
        this.fireSprite.bringToTop();

        this.showFire--;
        if (this.showFire == 0) {
            this.fireSprite.visible = false;
        }
    }
}

ISC.Tower.prototype.sale = function() {
    this.dead = true;
}

ISC.Tower.prototype.remove = function() {
    this.fireSprite.destroy();
    this.destroy();
}

ISC.Tower.prototype.isDead = function() {
    return this.dead;
}
