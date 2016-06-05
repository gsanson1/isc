ISC.MainMenu = function (game) {

    this.Sbutton;

};

ISC.MainMenu.prototype = {



    create: function () {


        this.Sbutton = this.add.button(673,448,'Startbutton',this.ActionOnClick,this);


    },
    ActionOnClick: function () {

        this.state.start('Game');

    },

};
