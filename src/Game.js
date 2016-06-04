
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
    this.sea;
    this.towers = [];
};

ISC.Game.prototype = {

    create: function () {

        this.sea = this.add.sprite(0, 0, 'sea');


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

        this.towers.push(new ISC.Tower(this.game, 50, 50, 'a0'));
        this.towers.push(new ISC.Tower(this.game, 150, 150, 'a1'));
        this.towers.push(new ISC.Tower(this.game, 250, 250, 'b0'));
        this.towers.push(new ISC.Tower(this.game, 350, 350, 'b1'));

        var game = this.game;
        this.towers.forEach(function(tower) {
            game.add.existing(tower);
        });
        // Lancement son
        music = game.add.audio('Plage'); // je charge ma music
        music.play();// je la joue
        
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

    }

};
