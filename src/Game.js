
ISC.Game = function (game) {

    // When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;  // a reference to the currently running game
    this.add;  // used to add sprites, text, groups, etc
    this.camera; // a reference to the game camera
    this.cache;  // the game cache
    this.input;  // the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;  // for preloading assets
    this.math;  // lots of useful common math operations
    this.sound;  // the sound manager - add a sound, play one, set-up markers, etc
    this.stage;  // the game stage
    this.time;  // the clock
    this.tweens;    //  the tween manager
    this.state;     // the state manager
    this.world;  // the game world
    this.particles; // the particle manager
    this.physics; // the physics manager
    this.rnd;  // the repeatable random number generator

    // You can use any of these from any function within this State.
    // But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.bg;
};

ISC.Game.prototype = {

    create: function () {

        this.sea = this.add.sprite(0, 0, 'sea');
        // this.map = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'reef');

        // this.map = game.add.tilemap();
        //
        // //  Add a Tileset image to the map
        // this.map.addTilesetImage('reef');
        //
        // //  Creates a new blank layer and sets the map dimensions.
        // //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
        // this.map = map.create('level1', 40, 30, 32, 32);
        // this.map.scrollFactorX = 0.5;
        // this.map.scrollFactorY = 0.5;


        // Init map
        this.map = new Map(24, 12, new Point(23, 5));
        this.map.addTower(12, 5);
        this.map.addTower(12, 4);
        this.map.addTower(12, 6);
        // Active enemies
        this.enemies = [];

        for (var i = 0; i < 5; i++) {
            this.enemies.push(new Enemy(this.game, this.map, -63, i * 150, 2 + i));
        }
    },

    update: function () {

        // Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].move();
        }
    },

    quitGame: function (pointer) {

        // Here you should destroy anything you no longer need.
        // Stop music, delete sprites, purge caches, free resources, all that good stuff.

        // Then let's go back to the main menu.
        this.state.start('MainMenu');
    },

    resize: function (width, height) {

        // If the game container is resized this function will be called automatically.
        // You can use it to align sprites that should be fixed in place and other responsive display things.

        this.sea.width = width;
        this.sea.height = height;

    }

};
