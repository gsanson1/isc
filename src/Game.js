
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
    this.enemies = [];
    this.music;
    this.buildMode = false;
    this.towerPlaceholder;
    this.towerPlaceholderShotCircle;
    this.quitGamekey;

    // Tower shortcut to construct
    this.tower1key;
    this.tower2key;
    this.tower3key;
    this.tower4key;

    // bouton ui
    this.bpTower1;
    this.bpTower2;
    this.bpTower3;
    this.bpTower4;
    this.bpTower5;
    this.bpSale;

    this.startCountdown = 3;
    this.startTimerText;
    this.startTimer;
    this.isSelected = false;
    this.saleMode = false;
};

ISC.Game.prototype = {
    create: function () {


        var enemyDestination = new Point(22, 6);
        this.sea = this.add.sprite(0, 0, 'sea');
        // var islandPosition = Tools.getGraphicPosition(enemyDestination);
        // this.island = this.add.sprite(islandPosition.x, islandPosition.y, 'island');
        this.island = this.add.sprite(1408, 0, 'island');
        this.UI = this.add.sprite(0, 768, 'UI');

        this.remainingLives = parameters.lives;
        this.credit = parameters.initialCredit;

        // Init map
        this.map = new Map(24, 12, enemyDestination);
        // Island
        for (var i = 2; i < 10; i++) {
            this.map.addTower(23, i);
        }

        // Towers
        this.addTower(4, 4, 'a0');
        this.addTower(5, 5, 'a1');
        this.addTower(6, 6, 'b0');
        this.addTower(7, 7, 'b1');

        // Lancement son
        this.music = this.add.audio('Plage'); // je charge ma music
        this.music.play();// play

        // Bouton UI achat tour

        this.bpTower1 = this.add.button(400,780,'bp_Tower1',function(){this.chooseTowerToBuild(1,'a0')  },this);
        this.bpTower2 = this.add.button(530,780,'bp_Tower2',function(){this.chooseTowerToBuild(1,'a1')  },this);
        this.bpTower3 = this.add.button(660,780,'bp_Tower3',function(){this.chooseTowerToBuild(1,'b0')  },this);
        this.bpTower4 = this.add.button(790,780,'bp_Tower4',function(){this.chooseTowerToBuild(1,'b1')  },this);
        this.bpTower5 = this.add.button(910,780,'bp_Tower5',function(){this.chooseTowerToBuild(1,'b2')  },this);
        this.bpTower6 = this.add.button(1040,780,'bp_Tower6',function(){this.chooseTowerToBuild(1,'b2')  },this);
        this.bpTower7 = this.add.button(1170,780,'bp_Tower7',function(){this.chooseTowerToBuild(1,'b2')  },this);
        this.bpSale   = this.add.button(200,780,'bp_sale', this.activateSaleMode,this);

        this.towerPlaceholderShotCircle = this.add.graphics(0, 0);
        this.towerPlaceholderShotCircle.visible = false;

        this.towerPlaceholder = new ISC.Tower(this.game, this.input.position.x, this.input.position.y, 'a0');
        this.towerPlaceholder.visible = false;
        this.towerPlaceholder.alpha = 0.7;

        this.drawTowerPlaceholderShotCircle();

        this.input.addMoveCallback(this.updateCursor, this);

        this.quitGamekey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.quitGamekey.onDown.add(this.quitBuildMode, this);

        this.quitGamekey = this.input.keyboard.addKey(Phaser.Keyboard.P);
        this.quitGamekey.onDown.add(this.quitGame, this);

        this.tower1key = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.tower1key.onDown.add(this.chooseTowerToBuild, this, 0, 'a0');

        this.tower2key = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.tower2key.onDown.add(this.chooseTowerToBuild, this, 0, 'a1');

        this.tower3key = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
        this.tower3key.onDown.add(this.chooseTowerToBuild, this, 0, 'b0');

        this.tower4key = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        this.tower4key.onDown.add(this.chooseTowerToBuild, this, 0, 'b1');

        this.startCountdown = 3;

        this.startTimerText = this.add.text(this.game.world.centerX, this.game.world.centerY, this.startCountdown, { font: "64px Arial", fill: "#ffffff", align: "center" });
        this.startTimerText.anchor.setTo(0.5, 0.5);

        this.startTimer = this.time.events.loop(Phaser.Timer.SECOND, this.updateStartTimer, this);
    },

    addTower: function(_x, _y, _type) {

        var cost = parameters.towers['tower_' + _type].cost;

        if (cost < this.credit) {
            this.credit -= cost;

            var gx = _x << 6;
            var gy = _y << 6;

            this.towers.push(new ISC.Tower(this.game, gx, gy, _type));
            if (this.towerPlaceholder) {
                this.towerPlaceholder.bringToTop();
            }
            this.map.addTower(_x, _y);
        }
    },

    addTowerAtPosition: function(position, _type) {
        var tiledPosition = Tools.getTiledPosition(position);
        this.addTower(tiledPosition.x, tiledPosition.y, _type);
    },

    update: function () {
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].isDead() || this.enemies[i].landed()) {
                if (this.enemies[i].isDead()){
                    this.credit += this.enemies[i].reward;
                }
                else if (this.enemies[i].landed()){
                    this.remainingLives--;
                }

                this.enemies[i].remove();
                this.enemies.splice(i, 1);
                i--;

            } else {
                this.enemies[i].move();
            }
        }

        var target = null;
        for (var i = 0; i < this.towers.length; i++) {
            target = this.towers[i].findTarget(this.enemies);
            if (target.enemy && this.towers[i].nextFire < this.game.time.time) {
                target.enemy.hit(this.towers[i].damage);
                this.towers[i].nextFire = this.game.time.time + this.towers[i].fireRate;
            }
        }


    },

    quitGame: function () {

        // Here you should destroy anything you no longer need.
        // Stop music, delete sprites, purge caches, free resources, all that good stuff.

        // Then let's go back to the main menu.
        this.state.start('MainMenu');
    },

    quitBuildMode: function () {
        this.deactivateBuildMode();
    },

    updateCursor: function () {
        if (this.buildMode) {
            var tiledPosition = Tools.getTiledPosition(this.input.position);

            if (tiledPosition.y < 12) {
                this.moveTowerPlaceHolderToPointer();
                if (this.map.canAddTower(tiledPosition.x, tiledPosition.y)) {
                    this.towerPlaceholder.tint = 0xFFFFFF;
                    if (this.input.mousePointer.isDown) {
                        this.addTowerAtPosition(this.towerPlaceholder.position, this.towerPlaceholder.type);
                    }
                }
                else {
                    this.towerPlaceholder.tint = 0xFF00FF;
                }
            }
            else {
                this.towerPlaceholder.x = tiledPosition.x << 6;
                this.towerPlaceholderShotCircle.x = this.towerPlaceholder.x + 32;
            }
        }
    },

    toggleBuildMode: function (buildMode) {
        this.buildMode = buildMode;
        this.moveTowerPlaceHolderToPointer();
        this.towerPlaceholder.visible = buildMode;
        this.towerPlaceholderShotCircle.visible = buildMode;
    },

    activateBuildMode: function () {
        this.toggleBuildMode(true);
    },

    deactivateBuildMode: function () {
        this.toggleBuildMode(false);
    },

    moveTowerPlaceHolderToPointer: function () {
        var tiledPosition = Tools.getTiledPosition(this.input.position);
        if (tiledPosition.y >= 12) {
            tiledPosition.y = 11;
        }

        var placeholderPosition = Tools.getGraphicPosition(tiledPosition);
        this.towerPlaceholder.x = placeholderPosition.x;
        this.towerPlaceholder.y = placeholderPosition.y;

        this.towerPlaceholderShotCircle.x = this.towerPlaceholder.x + 32;
        this.towerPlaceholderShotCircle.y = this.towerPlaceholder.y + 32;
    },

    chooseTowerToBuild: function (key, towerType) {
        this.towerPlaceholder.type = towerType;
        this.towerPlaceholder.loadTexture('tower_' + towerType);
        this.drawTowerPlaceholderShotCircle();
        this.toggleBuildMode();

        this.activateBuildMode();
    },

    drawTowerPlaceholderShotCircle: function () {
        this.towerPlaceholderShotCircle.clear();
        this.towerPlaceholderShotCircle.beginFill(0xFFFFFF, 1);
        this.towerPlaceholderShotCircle.alpha = 0.3;
        this.towerPlaceholderShotCircle.lineStyle(3, 0xFFFFFF)
        this.towerPlaceholderShotCircle.drawCircle(0, 0, Math.sqrt(parameters.towers['tower_' + this.towerPlaceholder.type].distance));
    },

    updateStartTimer: function() {
        this.startCountdown--;

        this.startTimerText.setText(this.startCountdown);

        if (this.startCountdown == 0) {
            this.time.events.remove(this.startTimer);
            this.startTimerText.visible = false;
            this.launchWave();
        }
    },

    launchWave: function () {
        for (var i = 0; i < 5; i++) {
            this.enemies.push(new Enemy(this.game, this.map, -63, i * 150, 'a' + (i % 3)));
        }
    },

    activateSaleMode: function(){

        this.saleMode = true;

    },



};
