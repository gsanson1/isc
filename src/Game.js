
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
    this.enemyDestination;
    this.music;
    this.buildMode = false;
    this.towerPlaceholder;
    this.towerPlaceholderShotCircle;
    this.restartGamekey;

    // Tower shortcut to construct
    this.tower1key;
    this.tower2key;
    this.tower3key;
    this.tower4key;
    this.tower5key;
    this.tower6key;
    this.tower7key;

    // bouton ui
    this.menuLifes = [];
    this.menuCredit;
    this.bpSale;
    this.btowers = [];
    this.bpTower1;
    this.bpTower2;
    this.bpTower3;
    this.bpTower4;
    this.bpTower5;
    this.bpTower6;
    this.bpTower7;

    this.startCountdown = parameters.waves.timeFirstWave;
    this.startTimerText;
    this.startTimer;

    this.waveCountdown = parameters.waves.timeFirstWave;
    this.waveTimerText;
    this.waveTimer;

    this.saleMode = false;
    this.salekey;

    this.credit;
    this.creditText;

    this.waveManager;
    this.waveManagerWaveCountText;

    this.remainingLives;

    this.textColour = '#5A361F';


};

ISC.Game.prototype = {
    create: function () {

        this.enemyDestination = new Point(22, 6);
        this.sea = this.add.sprite(0, 0, 'sea');
        // var islandPosition = Tools.getGraphicPosition(enemyDestination);
        // this.island = this.add.sprite(islandPosition.x, islandPosition.y, 'island');
        this.island = this.add.sprite(1408, 0, 'island');
        this.UI = this.add.sprite(0, 768, 'UI');

        this.remainingLives = parameters.lives;
        this.credit = parameters.initialCredit;

        for(var i = 0;i < this.remainingLives; i++) {
            this.menuLifes.push(this.add.sprite(30 + (i * 32), 820, 'menu_wererabbit'));
        }

        this.menuCredit = this.add.sprite(130, 820, 'menu_credit');
        this.creditText = this.add.text(180, 830, this.credit, {
            font: "40px Ritaglio",
            fill: this.textColour,
            align: "center"
        });

        // Init map
        this.map = new Map(24, 12, this.enemyDestination);
        // Island
        for (var i = 2; i < 10; i++) {
            this.map.addTower(23, i);
        }

        //  son de la plage
        this.plage = this.add.audio('Plage'); // vague
        this.mouette = this.add.audio('Moette'); // mouette
        this.plage.play();// play
        this.plage.volume = 0.1;// volume de la plage

        // son de l'argent
        this.argent = this.add.audio('Argent');
        this.argentnul = this.add.audio('hihiPlusDargent');

        this.lose = this.add.audio('VieEnMoins');




        // Boutons in-game UI
        this.bpSale = this.add.button(270, 780, 'bp_sale', this.toggleSaleMode, this);

        this.bpTower1 = this.add.button(410, 780, 'bp_Tower1', function () {
            this.chooseTowerToBuild(1, 'obstacle')
        }, this);
        this.bpTower1.type = 'tower_obstacle';
        this.btowers.push(this.bpTower1);

        this.bpTower2 = this.add.button(550, 780, 'bp_Tower2', function () {
            this.chooseTowerToBuild(1, 'a0')
        }, this);
        this.bpTower2.type = 'tower_a0';
        this.btowers.push(this.bpTower2);

        this.bpTower3 = this.add.button(680, 780, 'bp_Tower3', function () {
            this.chooseTowerToBuild(1, 'a1')
        }, this);
        this.bpTower3.type = 'tower_a1';
        this.btowers.push(this.bpTower3);

        this.bpTower4 = this.add.button(810, 780, 'bp_Tower4', function () {
            this.chooseTowerToBuild(1, 'b0')
        }, this);
        this.bpTower4.type = 'tower_b0';
        this.btowers.push(this.bpTower4);

        this.bpTower5 = this.add.button(930, 780, 'bp_Tower5', function () {
            this.chooseTowerToBuild(1, 'b1')
        }, this);
        this.bpTower5.type = 'tower_b1';
        this.btowers.push(this.bpTower5);

        this.bpTower6 = this.add.button(1090, 780, 'bp_Tower6', function () {
            this.chooseTowerToBuild(1, 'b2')
        }, this);
        this.bpTower6.type = 'tower_b2';
        this.btowers.push(this.bpTower6);

        this.bpTower7 = this.add.button(1220, 780, 'bp_Tower7', function () {
            this.chooseTowerToBuild(1, 'tentacle')
        }, this);
        this.bpTower7.type = 'tower_b2';
        this.btowers.push(this.bpTower7);

        this.btowers.forEach(this.createBtowerText.bind(this));

        this.towerPlaceholderShotCircle = this.add.graphics(0, 0);
        this.towerPlaceholderShotCircle.visible = false;

        this.towerPlaceholder = new ISC.Tower(this.game, this.input.position.x, this.input.position.y, 'a0');
        this.towerPlaceholder.visible = false;
        this.towerPlaceholder.alpha = 0.7;

        this.drawTowerPlaceholderShotCircle();

        this.input.addMoveCallback(this.updateCursor, this);

        this.restartGamekey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.restartGamekey.onDown.add(this.quitBuildMode, this);

        this.restartGamekey = this.input.keyboard.addKey(Phaser.Keyboard.P);
        this.restartGamekey.onDown.add(this.quitGame, this);

        this.tower1key = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.tower1key.onDown.add(this.chooseTowerToBuild, this, 0, 'obstacle');

        this.tower2key = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.tower2key.onDown.add(this.chooseTowerToBuild, this, 0, 'a0');

        this.tower3key = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
        this.tower3key.onDown.add(this.chooseTowerToBuild, this, 0, 'a1');

        this.tower4key = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        this.tower4key.onDown.add(this.chooseTowerToBuild, this, 0, 'b0');

        this.tower5key = this.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        this.tower5key.onDown.add(this.chooseTowerToBuild, this, 0, 'b1');

        this.tower6key = this.input.keyboard.addKey(Phaser.Keyboard.SIX);
        this.tower6key.onDown.add(this.chooseTowerToBuild, this, 0, 'b2');

        this.tower7key = this.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        this.tower7key.onDown.add(this.chooseTowerToBuild, this, 0, 'tentacle');

        this.salekey = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.salekey.onDown.add(this.toggleSaleMode, this);

        this.waveManager = new WaveManager(this);

        this.explosion = this.fireSprite = this.game.add.sprite(1200, 0, 'explosion');
        this.explosion.visible = false;
        this.exCountDown = 0;

        this.startCountdown = parameters.waves.timeFirstWave;
        this.startTimerText = this.add.text(this.game.world.centerX, this.game.world.centerY, this.startCountdown, {
            font: "64px Ritaglio",
            fill: this.textColour,
            align: "center"
        });
        this.startTimerText.anchor.setTo(0.5, 0.5);

        this.waveCountdown = parameters.waves.timeNextWave;
        this.waveTimerText = this.add.text(1410, 880, this.waveCountdown + 's', {
            font: "32px Ritaglio",
            fill: this.textColour,
            align: "center"
        });
        this.waveTimerText.anchor.setTo(0.5, 0.5);
        this.waveTimerText.visible = false;

        this.waveManagerWaveCountText = this.add.text(1380, 815, 'Wave 1', {
            font: "44px Ritaglio",
            fill: this.textColour,
            align: "center"
        });

        this.startTimer = this.time.events.loop(Phaser.Timer.SECOND, this.updateStartTimer, this);
    },

    addTower: function (_x, _y, _type) {

        var cost = parameters.towers['tower_' + _type].cost;

        if (cost <= this.credit) {
            this.updateCredit(-cost);

            var gx = _x << 6;
            var gy = _y << 6;

            var tower = new ISC.Tower(this.game, gx, gy, _type);
            tower.inputEnabled = true;
            tower.events.onInputDown.add(this.clickOnTower, this);
            this.towers.push(tower);
            if (this.towerPlaceholder) {
                this.towerPlaceholder.bringToTop();
            }
            this.map.addTower(_x, _y);
        }
    },

    addTowerAtPosition: function (position, _type) {
        var tiledPosition = Tools.getTiledPosition(position);
        this.addTower(tiledPosition.x, tiledPosition.y, _type);
    },

    update: function () {
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].isDead() || this.enemies[i].landed(this.enemyDestination)) {
                if (this.enemies[i].isDead()) {
                    this.updateCredit(this.enemies[i].reward);

                }
                else if (this.enemies[i].landed(this.enemyDestination)) {
                    this.remainingLives--;
                    if (this.remainingLives == 0) {
                        this.state.start('EndPage', true, false, this.waveManager.countWave);
                    }
                    this.updateMenuLife();
                    this.exCountDown = 60;
                    this.islansExplosion=this.add.audio('Explosion');
                    this.islansExplosion.play();
                    this.islansExplosion.volume = 0.5;
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
            if (this.towers[i].isDead()) {
                this.map.removeTower(this.towers[i].x >> 6, this.towers[i].y >> 6);
                this.towers[i].remove();
                this.towers.splice(i, 1);
                i--;
            }
            else {
                if (this.towers[i].nextFire < this.game.time.time) {
                    target = this.towers[i].findTarget(this.enemies);
                    if (target.enemy) {
                        target.enemy.hit(this.towers[i].damage);
                        this.towers[i].nextFire = this.game.time.time + this.towers[i].fireRate;
                    }
                }

                this.towers[i].refresh();
            }
        }

        // Explosion
        if (this.exCountDown > 0) {
            this.explosion.visible = true;

            this.exCountDown--;
            if (this.exCountDown == 0) {
                this.explosion.visible = false;
            } else {
                this.explosion.frame = 3 - Math.floor(this.exCountDown / 15);
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
                    this.drawTowerPlaceholderShotCircle();
                    if (this.input.activePointer.isDown) {
                        this.addTowerAtPosition(this.towerPlaceholder.position, this.towerPlaceholder.type);
                    }
                }
                else {
                    this.towerPlaceholder.tint = 0xFF0000;
                    this.drawTowerPlaceholderShotCircle(true);
                }
            }
            else {
                this.towerPlaceholder.x = tiledPosition.x << 6;
                this.towerPlaceholderShotCircle.x = this.towerPlaceholder.x + 32;
            }
        }
    },

    toggleBuildMode: function (buildMode) {
        if (buildMode) {
            this.deactivateSaleMode();
        }

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
        this.activateBuildMode();
    },

    drawTowerPlaceholderShotCircle: function (isRed) {
        this.towerPlaceholderShotCircle.clear();
        this.towerPlaceholderShotCircle.alpha = 0.3;

        var circleColour = 0xFFFFFF;
        var lineColour = 0xFFFFFF;

        if (isRed) {
            circleColour = 0xFF0000;
            lineColour = 0xFF0000;
        }

        this.towerPlaceholderShotCircle.beginFill(circleColour, 1);
        this.towerPlaceholderShotCircle.lineStyle(3, lineColour);
        this.towerPlaceholderShotCircle.drawCircle(0, 0, Math.sqrt(parameters.towers['tower_' + this.towerPlaceholder.type].distance) * 2);
    },

    updateStartTimer: function () {
        this.startCountdown--;

        this.startTimerText.setText(this.startCountdown);

        if (this.startCountdown == 0) {
            this.time.events.remove(this.startTimer);
            this.startTimerText.visible = false;
            this.launchWave();

            this.waveTimer = this.time.events.loop(Phaser.Timer.SECOND, this.updateWaveTimer, this);
            this.waveTimerText.visible = true;

            this.ohDesLamasFirst = this.add.audio('ohNonDesLamas2'); // des lams
            this.ohDesLamasFirst.play();// play
            this.ohDesLamasFirst.volume = 1;// volume de la plage
        }
    },

    updateWaveTimer: function () {
        this.waveCountdown--;

        this.waveTimerText.setText(this.waveCountdown + 's');

        if (this.waveCountdown == 0) {
            this.waveCountdown = parameters.waves.timeNextWave;
            this.waveTimerText.setText(parameters.waves.timeNextWave + 's');
            this.launchWave();
            this.waveManagerWaveCountText.setText('Wave ' + this.waveManager.countWave);


            this.ohDesLamas = this.add.audio('monDieu'); // des lams
            this.ohDesLamas.play();// play
            this.ohDesLamas.volume = 0.5;// volume de la plage



        }
    },

    launchWave: function () {
        this.waveManager.launchWave();
        this.soundMouette();
    },

    activateSaleMode: function () {
        this.setSaleMode(true);
    },

    deactivateSaleMode: function () {
        this.setSaleMode(false);
    },

    setSaleMode: function (saleMode) {
        if (saleMode) {
            this.deactivateBuildMode();
        }

        this.saleMode = saleMode;
        var tintColour = 0xFFFFFF;

        if (saleMode) {
            tintColour = 0xA9A9A9;
        }

        this.bpSale.tint = tintColour;
    },

    toggleSaleMode: function () {
        this.setSaleMode(!this.saleMode);
    },

    clickOnTower: function (tower) {
        if (this.saleMode) {
            this.updateCredit(parameters.towers['tower_' + tower.type].recycle);
            tower.sale();
            this.deactivateSaleMode();
        }
    },

    updateCredit: function (credit) {
        this.credit += credit;
        this.creditText.setText(this.credit);
        this.updateUi();
        this.earnMoney();
    },

    updateUi: function() {
        var credit = this.credit;


        this.btowers.forEach(function (btower) {
            var towerCost = parameters.towers[btower.type].cost;

            if (towerCost > credit) {

                btower.tint = 0xA9A9A9;


            }
            else {
                btower.tint = 0xFFFFFF;
            }
        });
    },

    createBtowerText: function (btower) {
        this.add.text(btower.x + 40, btower.y + 80, parameters.towers[btower.type].cost, {
            font: "20px Ritaglio",
            fill: this.textColour
        });
    },

    soundMouette: function () {

        this.mouette.play();
        this.mouette.volume = 0.1;

    },

    earnMoney: function () {

        this.argent.play();
        this.argent.volume = 0.3;

    },

    updateMenuLife: function () {
        var launchsound = this;
        this.menuLifes.forEach(function (menuLife) {
            menuLife.destroy();
            launchsound.lose.play();
            launchsound.lose.volume = 0.8;
        })

        for(var i = 0;i < this.remainingLives; i++) {
            this.menuLifes.push(this.add.sprite(30 + (i * 32), 820, 'menu_wererabbit'));
        };
    },


};