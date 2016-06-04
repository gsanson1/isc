/**
 * Created by gsanson on 04/06/2016.
 */

var Enemy = function(_game, _map, _x, _y, _type) {
    this.map = _map;
    this.life = _game.life;

    var enemyType = 'enemy_' + _type;

    this.speed = parameters.enemies[enemyType].speed;
    this.energy = parameters.enemies[enemyType].energy;
    this.currentEnergy = this.energy;

    this.boatSprite = _game.add.sprite(_x, _y, 'boat');
    
    this.lifeBack = _game.add.sprite(_x + 2, _y + 2, 'bar_red');
    this.lifeFront = _game.add.sprite(_x + 2, _y + 2, 'bar_green');
    this.crop = new Phaser.Rectangle(0, 0, 60, 2);
    this.lifeFront.crop(this.crop);
}

Enemy.prototype = {

    isDead: function() {
        return this.currentEnergy <= 0;
    },

    hit: function(_points) {
        this.currentEnergy -= _points;
        this.crop.width = 30 * this.currentEnergy / this.energy;
    },

    move: function() {
        var px = (this.boatSprite.x + 1) >> 6;
        var py = (this.boatSprite.y + 1) >> 6;

        var next = this.map.nextCell(px, py);

        // Center of next cell
        var cx = ((px + next.x) << 6);
        var cy = ((py + next.y) << 6);

        // delta pos
        var vect = new Phaser.Point(cx - this.boatSprite.x, cy - this.boatSprite.y).normalize();

        this.boatSprite.x += vect.x * this.speed;
        this.boatSprite.y += vect.y * this.speed;

        this.lifeBack.x = this.boatSprite.x + 2;
        this.lifeBack.y = this.boatSprite.y + 2;

        this.lifeFront.x = this.lifeBack.x;
        this.lifeFront.y = this.lifeBack.y;

        this.lifeFront.crop.width = 20;
    }
}




var EnemyManager = function() {
    this.enemies = [];
}

EnemyManager.prototype = {
    newWave: function(_size) {
        //for (var i = 0; i < )
    }
}

