
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
    this.UI;
    this.towers = [];
    this.music;
    this.constructMode = false;
    this.towerPlaceholder;
    this.quitGamekey;
};

ISC.Game.prototype = {
    create: function () {

        this.sea = this.add.sprite(0, 0, 'sea');
        this.UI = this.add.sprite(0,768, 'UI')

        // Init map
        this.map = new Map(24, 12, new Point(23, 5));

        // Active enemies
        this.enemies = [];
        for (var i = 0; i < 5; i++) {
            this.enemies.push(new Enemy(this.game, this.map, -63, i * 150, 'a' + (i % 3)));
        }

        // Towers
        this.addTower(4, 4, 'a0');
        this.addTower(5, 5, 'a1');
        this.addTower(6, 6, 'b0');
        this.addTower(7, 7, 'b1');

        var game = this.game;
        this.towers.forEach(function(tower) {
            game.add.existing(tower);
        });
        // Lancement son
        this.music = game.add.audio('Plage'); // je charge ma music
        this.music.play();// je la joue

        this.towerPlaceholder = new ISC.Tower(this.game, this.input.position.x, this.input.position.y, 'a0');
        this.towerPlaceholder.visible = false;
        game.add.existing(this.towerPlaceholder);

        this.input.addMoveCallback(this.updateCursor, this);
        key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.add(this.activateConstructMode, this);

        this.quitGamekey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.quitGamekey.onDown.add(this.quitGame, this);
    },

    addTower: function(_x, _y, _type) {

        // Graphics coords
        var gx = _x << 6;
        var gy = _y << 6;

        this.towers.push(new ISC.Tower(this.game, gx, gy, _type));
        this.map.addTower(_x, _y);
    },

    update: function () {

        // Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].move();
        }

        var target = null;
        for (var i = 0; i < this.towers.length; i++) {
            target = this.towers[i].findTarget(this.enemies);
            if (target != null) {
                console.log("Tour " + i + " -> tir");
            }
        }
    },

    quitGame: function () {

        // Here you should destroy anything you no longer need.
        // Stop music, delete sprites, purge caches, free resources, all that good stuff.

        // Then let's go back to the main menu.
        this.state.start('MainMenu');
    },

    updateCursor: function () {
        var placeholderPosition = Tools.getTiledPosition(this.input.position);
        this.towerPlaceholder.x = placeholderPosition.x;
        this.towerPlaceholder.y = placeholderPosition.y;

        if (this.constructMode) {
            if (this.input.mousePointer.isDown) {
                console.log('pouet');
            }
        }
    },

    activateConstructMode: function () {
        this.constructMode = !this.constructMode;
        this.towerPlaceholder.visible = !this.towerPlaceholder.visible;
    }

};
