ISC.EndPage = function (game) {
    this.game = game;

    this.restartGamekey;
};

ISC.EndPage.prototype = {

    create: function () {
        this.splash = this.game.add.sprite(0, 0, 'endscr');
        this.gameover = this.game.add.sprite(260, 483, 'gameover');

        this.restartGamekey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.restartGamekey.onDown.add(this.restartGame, this);
    },

    restartGame: function () {
        this.state.start('MainMenu');
    },

};
