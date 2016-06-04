ISC.MainMenu = function (game) {

    this.Sbutton;

};

ISC.MainMenu.prototype = {



    create: function () {


        this.Sbutton = this.add.button(673,448,'Startbutton',this.ActionOnClick,this,2,1,0);


    },
    ActionOnClick: function () {

        this.state.start('Game');

    },



    update: function (){       // Do some nice funky main menu effect here

    },
};
