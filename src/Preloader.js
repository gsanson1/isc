ISC.Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

ISC.Preloader.prototype = {

    preload: function () {

        // These are the assets we loaded in Boot.js
        // A nice sparkly background and a loading progress bar

        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

        // This sets the preloadBar sprite as a loader sprite.
        // What that does is automatically crop the sprite from 0 to full-width
        // as the files below are loaded in.

        this.load.setPreloadSprite(this.preloadBar);

        // Here we load the rest of the assets our game needs.
        // You can find all of these assets in the Phaser Examples repository

        this.load.image('sea', 'images/sea.png');
        this.load.image('UI', 'images/ingame_UI_placeholder.png');
        this.load.image('obstacle', 'images/obstacle.png');
        this.load.image('reef', 'images/reef.png');
        this.load.image('boat', 'images/enemy_ship_a.png');
        //this.load.image('tower_a0', 'images/tower_a0.png');
        //this.load.image('tower_a1', 'images/tower_a1.png');
        //this.load.image('tower_b0', 'images/tower_b0.png');
        //this.load.image('tower_b1', 'images/tower_b1.png');
        this.load.image('bar_red', 'images/bar_red.png');
        this.load.image('bar_green', 'images/bar_green.png');
        this.load.image('island', 'images/island.png');

        this.load.spritesheet('tower_a0', 'images/spritesheet_short-range-tower.png', 64, 64, 8);
        this.load.spritesheet('tower_a1', 'images/spritesheet_short-range-tower.png', 64, 64, 8);
        this.load.spritesheet('tower_b0', 'images/spritesheet_long-range-tower.png', 64, 64, 8);
        this.load.spritesheet('tower_b1', 'images/spritesheet_long-range-tower.png', 64, 64, 8);

        // Chargement son.
        this.load.audio('Plage','sounds/sample/sf_plage_02.mp3'); // vas chercher le mp3
        // Ressource Menu
        this.load.spritesheet('Startbutton', 'images/button_sprite_sheet.png', 193, 71);

        // Ressource UI game
        this.load.image('bp_Tower1','images/bp_Tower1.png');
        this.load.image('bp_Tower2','images/bp_Tower2.png');
        this.load.image('bp_Tower3','images/bp_Tower3.png');
        this.load.image('bp_Tower4','images/bp_Tower4.png');
        this.load.image('bp_Tower5','images/bp_Tower5.png');
        this.load.image('bp_Sale','images/bp_sale.png');
        this.load.image('fb_pressbutton','images/Fb_pressbutton');

        
    },

    create: function () {

        this.state.start('MainMenu');

    }

};
