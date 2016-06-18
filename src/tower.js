ISC.Tower = function (game, x, y, type) {
    var towerType = 'tower_' + type;

    Phaser.Sprite.call(this, game, x, y, towerType);
    this.sound = this.game.add.audio(parameters.towers[towerType].sound);
    this.damage = parameters.towers[towerType].damage;
    this.distance = parameters.towers[towerType].distance;
    this.fireRate = parameters.towers[towerType].fireRate;
    this.cost = parameters.towers[towerType].cost;
    this.recycle = parameters.towers[towerType].recycle;

    this.static = parameters.towers[towerType].static | false;
    this.area = parameters.towers[towerType].area | false;
    this.attack = parameters.towers[towerType].attack;
    if (!this.attack) {
        this.attack = 'firearm';
    }

    this.fireDuration = parameters.towers[towerType].fireDuration | 5;
    this.type = type;

    this.showFire = 0;
    if (parameters.towers[towerType].distance > 0) {
        this.fireSprite = game.add.sprite(x, y, 'fx_' + type);
        this.fireSprite.visible = false;
    }

    this.up = null;
    if (parameters.towers[towerType].up) {
        this.up = game.add.sprite(x, y - 64, parameters.towers[towerType].up);
    }

    this.game = game;

    game.add.existing(this);

    this.nextFire = game.time.time + this.fireRate;
    this.dead = false;
};

ISC.Tower.prototype = Object.create(Phaser.Sprite.prototype);
ISC.Tower.prototype.constructor = ISC.Tower;

ISC.Tower.prototype.findTarget = function(_enemies) {

    var target = null;
    var dist =  this.distance;
    var newDist;
    var direction = 0;

    var enemies = [];

    for (var i = 0; i < _enemies.length; i++) {
        newDist = Tools.sqDist(this.x, this.y, _enemies[i].boatSprite.x, _enemies[i].boatSprite.y);
        if (this.area) {
            if (newDist < this.distance) {
                enemies.push({ enemy: _enemies[i], direction: -1 });
            }
        } else if (newDist < dist) {
            dist = newDist;
            target = _enemies[i];
        }
    }

    if (target) {
        if (!this.static) {
            direction = Tools.direction(this.x, this.y, target.boatSprite.x, target.boatSprite.y);
            this.frame = direction;
        }

        enemies.push({ enemy: target, direction: direction });
    }

    if (enemies.length > 0) {
        this.fireSprite.visible = true;
        this.showFire = this.fireDuration;

        this.sound.play();
        this.sound.volume = 0.8;
    }

    return enemies;
}

ISC.Tower.prototype.refresh = function() {
    if (this.up) {
        this.up.bringToTop();
    }

    if (this.showFire > 0) {
        this.fireSprite.frame = this.frame;
        this.fireSprite.bringToTop();

        this.showFire--;
        if (this.showFire == 0) {
            this.fireSprite.visible = false;
            this.sound.stop();
        }
    }
}

ISC.Tower.prototype.sale = function() {
    this.dead = true;
}

ISC.Tower.prototype.remove = function() {
    if (this.fireSprite) {
        this.fireSprite.destroy();
    }

    if (this.up) {
        this.up.destroy();
    }

    this.destroy();
}

ISC.Tower.prototype.isDead = function() {
    return this.dead;
}
