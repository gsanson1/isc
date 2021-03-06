ISC.Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

ISC.Preloader.prototype = {

    preload: function () {

        // These are the assets we loaded in Boot.js
        // A nice sparkly background and a loading progress bar

        this.preloadBar = this.add.sprite(568, 464, 'preloaderBar');

        // This sets the preloadBar sprite as a loader sprite.
        // What that does is automatically crop the sprite from 0 to full-width
        // as the files below are loaded in.

        this.load.setPreloadSprite(this.preloadBar);

        // Here we load the rest of the assets our game needs.
        // You can find all of these assets in the Phaser Examples repository

        this.load.image('sea', 'images/sea-bg.png');
        this.load.image('splash', 'images/ecran-titre.jpg');
        this.load.image('endscr', 'images/ecran.jpg');
        this.load.image('gameover', 'images/logo_gameover.png');
        this.load.image('UI', 'images/menu/bg-menu.png');
        this.load.image('obstacle', 'images/obstacle.png');
        this.load.spritesheet('boat_a0', 'images/full-lama.png', 64, 64, 12);
        this.load.spritesheet('boat_a1', 'images/full-lama2.png', 64, 64, 12);
        this.load.spritesheet('boat_a2', 'images/full-lama3.png', 64, 64, 12);
        this.load.spritesheet('boat_a3', 'images/full-lama4.png', 64, 64, 12);

        this.load.image('bar_red', 'images/bar_red.png');
        this.load.image('bar_green', 'images/bar_green.png');
        this.load.image('island', 'images/island.png');
        this.load.spritesheet('explosion', 'images/explosion.png', 330, 768, 4);

        this.load.image('tower_obstacle', 'images/tower_obstacle.png', 64, 64, 8);
        this.load.spritesheet('tower_a0', 'images/tower_short.png', 64, 64, 8);
        this.load.spritesheet('tower_a1', 'images/tower_heavy.png', 64, 64, 8);
        this.load.spritesheet('tower_b0', 'images/tower_long.png', 64, 64, 8);
        this.load.spritesheet('tower_b1', 'images/tower_heavy2.png', 64, 64, 8);
        this.load.spritesheet('tower_b2', 'images/tower_long2.png', 64, 64, 8);
        this.load.spritesheet('tower_tentacle', 'images/tentacle.png', 64, 64, 8);
        this.load.image('fx_tentacle', 'images/tentacle_fx.png');

        this.load.spritesheet('fx_a0', 'images/tower_fx_short.png', 64, 64, 8);
        this.load.spritesheet('fx_a1', 'images/tower_fx_heavy.png', 64, 64, 8);
        this.load.spritesheet('fx_b0', 'images/tower_fx_long.png', 64, 64, 8);
        this.load.spritesheet('fx_b1', 'images/tower_fx_heavy2.png', 64, 64, 8);

        this.load.image('reef', 'images/rock.png');

        this.load.image('tower_unicorn', 'images/unicorn1_down.png');
        this.load.image('tower_unicorn_up', 'images/unicorn1_up.png');
        this.load.image('fx_unicorn', 'images/unicorn_fx.png');


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
        this.load.image('menu_wererabbit','images/menu/wererabbit.png');
        this.load.image('menu_credit','images/menu/menu-carrot.png');
        this.load.image('bp_sale','images/menu/btn-resell.png');
        this.load.image('bp_Tower1','images/menu/btn-bouee.png');
        this.load.image('bp_Tower2','images/menu/btn-tower1.png');
        this.load.image('bp_Tower3','images/menu/btn-tower1+.png');
        this.load.image('bp_Tower4','images/menu/btn-tower2.png');
        this.load.image('bp_Tower5','images/menu/btn-tower2+.png');
        this.load.image('bp_Tower6','images/menu/btn-unicorn.png');
        this.load.image('bp_Tower7','images/menu/btn-tentacue.png');
    },

    create: function () {

        this.state.start('MainMenu');

    }

};
