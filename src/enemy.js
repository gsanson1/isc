/**
 * Created by gsanson on 04/06/2016.
 */

var Enemy = function(_game, _map, _x, _y, _type) {
    this.map = _map;
    this.life = _game.life;

    enemyType = 'enemy_' + _type;

    this.game = _game;
    this.speed = parameters.enemies[enemyType].speed * parameters.speedMul;
    this.energy = parameters.enemies[enemyType].energy;
    this.currentEnergy = this.energy;
    this.reward = parameters.enemies[enemyType].reward;

    this.boatSprite = _game.add.sprite(_x, _y, 'boat_' + _type);
    
    this.lifeBack = _game.add.sprite(_x + 2, _y + 2, 'bar_red');
    this.lifeFront = _game.add.sprite(_x + 2, _y + 2, 'bar_green');
    this.crop = new Phaser.Rectangle(0, 0, 60, 2);
    this.lifeFront.crop(this.crop);

    this.dying = 40;
}

Enemy.prototype = {

    isDead: function() {
        return this.currentEnergy <= 0;
    },
    
    
    landed: function(_enemyDestination) {
        var pos = Tools.getTiledPosition(this.boatSprite);

        return pos.x == _enemyDestination.x - 1 && pos.y == _enemyDestination.y;
    },

    remove: function() {
        this.boatSprite.destroy(true);
        this.lifeFront.destroy(true);
        this.lifeBack.destroy(true);
        
    },

    hit: function(_points) {
        this.currentEnergy -= _points;

        this.crop.width = Math.max(0, 60 * this.currentEnergy / this.energy);
        this.lifeFront.updateCrop();
    },

    move: function() {
        var px = (this.boatSprite.x + 1) >> 6;
        var py = (this.boatSprite.y + 1) >> 6;

        var next = this.map.nextCell(px, py);

        // Center of next cell
        var cx = ((px + next.x) << 6);
        var cy = ((py + next.y) << 6);

        // delta pos
        var vector = new Phaser.Point(cx - this.boatSprite.x, cy - this.boatSprite.y).normalize();

        this.boatSprite.x += vector.x * this.speed;
        this.boatSprite.y += vector.y * this.speed;

        this.boatSprite.frame = Tools.dirVector2(vector.x, vector.y);

        this.lifeBack.x = this.boatSprite.x + 2;
        this.lifeBack.y = this.boatSprite.y + 2;

        this.lifeFront.x = this.lifeBack.x;
        this.lifeFront.y = this.lifeBack.y;
    }
}


