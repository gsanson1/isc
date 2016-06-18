var parameters = {

    lives: 3,
    initialCredit: 750,
    speedMul: 0.8,
    reefs: 12,
    slowdown: 0.5,
    scare: 200,

    towers: {
        tower_obstacle: {
            damage: 0,
            distance: 0,
            fireRate: 0,
            cost: 35,
            recycle: 20
        },
        tower_a0: {
            damage: 2.5,
            distance: 64 * 64 * 3,
            fireRate: 100,
            cost: 140,
            recycle: 100,
            sound: 'Mitraillette'
        },
        tower_a1: {
            damage: 5,
            distance: 64 * 64 * 5,
            fireRate: 90,
            cost: 350,
            recycle: 250,
            sound: 'Mitraillette'
        },
        tower_b0: {
            damage: 25,
            distance: 64 * 64 * 48,
            fireRate: 2000,
            cost: 200,
            recycle: 150,
            sound: 'Explosion'
        },
        tower_b1: {
            damage: 40,
            distance: 64 * 64 * 60,
            fireRate: 2000,
            cost: 480,
            recycle: 320,
            sound: 'Explosion'
        },
        tower_unicorn: {
            up: 'tower_unicorn_up',
            damage: 30,
            distance: 64 * 64 * 20,
            fireRate: 20000,
            fireDuration: 50,
            cost: 900,
            recycle: 300,
            sound: 'Explosion',
            static: true,
            area: true,
            attack: 'fear'
        },
        tower_tentacle: {
            damage: 0,
            distance: 64 * 64 * 5,
            fireRate: 0,
            cost: 1200,
            recycle: 500,
            sound: 'Tulu',
            static: true,
            area: true,
            attack: 'slowdown'
        }
    },

    enemies: {
        enemy_a0: {
            speed: 2,
            energy: 45,
            reward: 20,
            sound:'ChefNain',
        },
        enemy_a1: {
            speed: 1,
            energy: 250,
            reward: 40,
            sound:'OhPinaise',
        },
        enemy_a2: {
            speed: 4,
            energy: 40,
            reward: 25,
            sound:'SousNain',
        },
        enemy_a3: {
            speed: 4.5,
            energy: 36,
            reward: 25,
            sound:'Froide',
        },
    },

    waves: {
        timeFirstWave: 5,     // Nombre de frames avant premiere vague
        unitsFirstWave: 2,      // Nombre d'unites dans la premiere vague
        timeNextWave: 10,      // Nombre de secondes avant les vagues (Hors premiere)
        switchEvery: 4,         // Changement nb unites => puissance
        strengthMul: 1.12,  // Augmentation de puissance (Toutes les switchEvery vagues)
        unitIncrease: 1,        // Augmentation par tour (+ Increment)
        waveGuests: 6,           // Premiere vague avec des guests
        ratioBasic: 0.85,        // Ratio de lama de type "basique"
        bossWave: 30            // Boss wave
    }
};