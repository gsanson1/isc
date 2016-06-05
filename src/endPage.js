ISC.EndPage = function (game) {
    this.game = game;

    this.restartGamekey;
    this.scoreText;
    this.waveCount;
    this.tween;
};

ISC.EndPage.prototype = {

    init: function (waveCount) {
        this.waveCount = waveCount;
    },

    create: function () {
        this.splash = this.game.add.sprite(0, 0, 'endscr');
        this.gameover = this.game.add.sprite(0, -600, 'gameover');

        this.tween = this.add.tween(this.gameover).to( { y: 0 }, 2400, Phaser.Easing.Bounce.Out, true);

        this.restartGamekey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.restartGamekey.onDown.add(this.restartGame, this);

        this.scoreText = this.add.text(1200, 800, "Wave " + this.waveCount, {
            font: "64px Ritaglio",
            fill: '#5A361F',
            align: "center"
        });
    },

    restartGame: function () {
        this.state.start('MainMenu');
    },

};
