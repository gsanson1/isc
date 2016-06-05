ISC.EndPage = function (game) {
    this.game = game;


};

ISC.EndPage.prototype = {

    create: function () {
        this.splash = this.game.add.sprite(0, 0, 'endscr');
    },
    ActionOnClick: function () {

        this.state.start('MainMenu');

    },

};
