ISC.MainMenu = function (game) {

    this.Sbutton;

};

ISC.MainMenu.prototype = {



    create: function () {

        this.splash = this.game.add.sprite(0, 0, 'splash');

        this.Sbutton = this.add.button(673, 648, 'Startbutton', this.ActionOnClick,this);


    },
    ActionOnClick: function () {

        this.state.start('Game');

    },

};
