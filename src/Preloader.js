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

        this.load.image('sea', 'images/sea-bg-grid.png');
        this.load.image('UI', 'images/ingame_UI_placeholder.png');
        this.load.image('obstacle', 'images/obstacle.png');
        this.load.image('reef', 'images/reef.png');
        this.load.spritesheet('boat_a0', 'images/ship_lama.png', 64, 64, 8);
        this.load.spritesheet('boat_a1', 'images/ship_lama2.png', 64, 64, 8);
        this.load.spritesheet('boat_a2', 'images/ship_lama3.png', 64, 64, 8);
        this.load.spritesheet('boat_a3', 'images/ship_lama4.png', 64, 64, 8);

        this.load.image('bar_red', 'images/bar_red.png');
        this.load.image('bar_green', 'images/bar_green.png');
        this.load.image('island', 'images/island.png');

        this.load.spritesheet('tower_a0', 'images/tower_short.png', 64, 64, 8);
        this.load.spritesheet('tower_a1', 'images/tower_short2.png', 64, 64, 8);
        this.load.spritesheet('tower_b0', 'images/tower_long.png', 64, 64, 8);
        this.load.spritesheet('tower_b1', 'images/tower_long2.png', 64, 64, 8);
        this.load.spritesheet('tower_b2', 'images/tower_long2.png', 64, 64, 8);

        this.load.spritesheet('fx_a0', 'images/tower_fx_short.png', 64, 64, 8);
        this.load.spritesheet('fx_a1', 'images/tower_fx_short.png', 64, 64, 8);
        this.load.spritesheet('fx_b0', 'images/tower_fx_long.png', 64, 64, 8);
        this.load.spritesheet('fx_b1', 'images/tower_fx_long.png', 64, 64, 8);

        // Chargement son.
        this.load.audio('Plage','sounds/sample/sf_plage_02.mp3'); // vas chercher le mp3
        // Ressource Menu
        this.load.image('Startbutton', 'images/start-btn.png');

        // Ressource UI game
        this.load.image('bp_Tower1','images/bp_Tower1.png');
        this.load.image('bp_Tower2','images/bp_Tower2.png');
        this.load.image('bp_Tower3','images/bp_Tower3.png');
        this.load.image('bp_Tower4','images/bp_Tower4.png');
        this.load.image('bp_Tower5','images/bp_Tower5.png');
        this.load.image('bp_Tower6','images/bp_Tower6.png');
        this.load.image('bp_Tower7','images/bp_Tower7.png');
        this.load.image('bp_sale','images/bp_sale.png');

    },

    create: function () {

        this.state.start('MainMenu');

    }

};
