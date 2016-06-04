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
        this.load.image('obstacle', 'images/obstacle.png');
        this.load.image('reef', 'images/reef.png');
        this.load.image('boat', 'images/enemy_ship_a.png');
        this.load.image('tower_a0', 'images/tower_a0.png');
        this.load.image('tower_a1', 'images/tower_a1.png');
        this.load.image('tower_b0', 'images/tower_b0.png');
        this.load.image('tower_b1', 'images/tower_b1.png');

        // Chargement son.
        this.load.audio('Plage','sounds/sample/sf_plage_02.mp3'); // vas chercher le mp3
        
    },

    create: function () {

        this.state.start('MainMenu');

    }

};
