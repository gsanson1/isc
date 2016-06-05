ISC.EndPage = function (game) {
    this.game = game;

    this.restartGamekey;
    this.scoreText;
    this.waveCount;
};

ISC.EndPage.prototype = {

    init: function (waveCount) {
        this.waveCount = waveCount;
    },

    create: function () {
        this.splash = this.game.add.sprite(0, 0, 'endscr');
        this.gameover = this.game.add.sprite(568, 464, 'gameover');

        this.restartGamekey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.restartGamekey.onDown.add(this.restartGame, this);

        this.scoreText = this.add.text(568, 550, "Wave " + this.waveCount, {
            font: "64px Ritaglio",
            fill: '#5A361F',
            align: "center"
        });
    },

    restartGame: function () {
        this.state.start('MainMenu');
    },

};
