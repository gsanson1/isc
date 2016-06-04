/**
 * Created by gsanson on 04/06/2016.
 */

var Enemy = function(_game, _map, _x, _y, _speed) {
    this.map = _map;
    this.speed = _speed;

    this.boatSprite = _game.add.sprite(_x, _y, 'boat');

}

Enemy.prototype = {
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

