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
        this.preloadBar = this.add.sprite(568, 464, 'preloaderBar');

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
        this.load.spritesheet('explosion', 'images/explosion.png', 330, 768, 4);

        this.load.image('tower_obstacle', 'images/tower_obstacle.png', 64, 64, 8)
        this.load.spritesheet('tower_a0', 'images/tower_short.png', 64, 64, 8);
        this.load.spritesheet('tower_a1', 'images/tower_short2.png', 64, 64, 8);
        this.load.spritesheet('tower_b0', 'images/tower_long.png', 64, 64, 8);
        this.load.spritesheet('tower_b1', 'images/tower_long2.png', 64, 64, 8);
        this.load.spritesheet('tower_b2', 'images/tower_long2.png', 64, 64, 8);

        this.load.spritesheet('fx_a0', 'images/tower_fx_short.png', 64, 64, 8);
        this.load.spritesheet('fx_a1', 'images/tower_fx_short.png', 64, 64, 8);
        this.load.spritesheet('fx_b0', 'images/tower_fx_long.png', 64, 64, 8);
        this.load.spritesheet('fx_b1', 'images/tower_fx_long.png', 64, 64, 8);

        // Chargement son ambiance.
        this.load.audio('Plage','sounds/sample/sf_plage_02.mp3');

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Chargement son bateau qui coule
        this.load.audio('ChefNain','sounds/sample/Son voix/bateau qui coule/Chef chef un nain qui coule.mp3');
        this.load.audio('OhPinaise','sounds/sample/Son voix/bateau qui coule/oh pinaise jai une licorne.mp3');
        this.load.audio('SousNain','sounds/sample/Son voix/bateau qui coule/Oh un sous nain quatic.mp3');
        this.load.audio('Froide','sounds/sample/Son voix/bateau qui coule/ou elle est froide.mp3');
        // FX
        this.load.audio('Abracadabra','sounds/sample/Son voix/Fx/abracada.mp3');
        this.load.audio('Adriama','sounds/sample/Son voix/Fx/Adriama.mp3');
        this.load.audio('Argent','sounds/sample/Son voix/Fx/argent.mp3');
        this.load.audio('Explosion','sounds/sample/Son voix/Fx/Explosion.mp3');
        this.load.audio('Moette','sounds/sample/Son voix/Fx/Moette.mp3');
        this.load.audio('Canon','sounds/sample/Son voix/Fx/tir canon.mp3');
        this.load.audio('Mitraillette','sounds/sample/Son voix/Fx/tir mitraillette.mp3');
        this.load.audio('Tulu','sounds/sample/Son voix/Fx/tulu.mp3');

        // Lose

        this.load.audio('VieEnMoins','sounds/sample/Son voix/Lose/Ah ah une vie en moins.mp3');
        this.load.audio('PetiteBiere','sounds/sample/Son voix/Lose/Hum je prendrais bien une petite bierre.mp3');
        this.load.audio('Eau','sounds/sample/Son voix/Lose/ils sont pas bu que de leau.mp3');
        this.load.audio('OnTaEu','sounds/sample/Son voix/Lose/On ta eu.mp3');
        this.load.audio('Youhou','sounds/sample/Son voix/Lose/Youhou nous y voici.mp3');

        //Nouvelle vague

        this.load.audio('lamasOloin','sounds/sample/Son voix/Nouvelle vague/Des lamas au loin.mp3');
        this.load.audio('monDieu','sounds/sample/Son voix/Nouvelle vague/Mon dieu encore des lamas.mp3');
        this.load.audio('ohNonDesLamas','sounds/sample/Son voix/Nouvelle vague/Oh non de lamas.mp3');
        this.load.audio('ohNonDesLamas2','sounds/sample/Son voix/Nouvelle vague/Oh non de lamas2.mp3');
        
        //Plus d'argent

        this.load.audio('hihiPlusDargent','sounds/sample/Son voix/Plus dargent/hihi plus dargent.mp3');
        this.load.audio('ilYAPlusDargent','sounds/sample/Son voix/Plus dargent/il y a plus dargent.mp3');
        this.load.audio('pasDeMonais','sounds/sample/Son voix/Plus dargent/pas des monais.mp3');


        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        // Ressource Menu
        this.load.image('Startbutton', 'images/start-btn.png');

        // Ressource UI game
        this.load.image('bp_sale','images/bp_sale.png');
        this.load.image('bp_Tower1','images/bp_Tower1.png');
        this.load.image('bp_Tower2','images/bp_Tower2.png');
        this.load.image('bp_Tower3','images/bp_Tower3.png');
        this.load.image('bp_Tower4','images/bp_Tower4.png');
        this.load.image('bp_Tower5','images/bp_Tower5.png');
        this.load.image('bp_Tower6','images/bp_Tower6.png');
        this.load.image('bp_Tower7','images/bp_Tower7.png');


    },

    create: function () {

        this.state.start('MainMenu');

    }

};
