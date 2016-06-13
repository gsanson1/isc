var parameters = {

    lives: 3,
    initialCredit: 700,
    speedMul: 0.8,
    reefs: 6,
    slowdown: 0.5,
    scare: 200,

    towers: {
        tower_obstacle: {
            damage: 0,
            distance: 0,
            fireRate: 0,
            cost: 35,
            recycle: 15
        },
        tower_a0: {
            damage: 3,
            distance: 64 * 64 * 3,
            fireRate: 100,
            cost: 140,
            recycle: 126,
            sound: 'Mitraillette'
        },
        tower_a1: {
            damage: 4,
            distance: 64 * 64 * 3,
            fireRate: 90,
            cost: 470,
            recycle: 423,
            sound: 'Mitraillette'
        },
        tower_b0: {
            damage: 18,
            distance: 64 * 64 * 56,
            fireRate: 2700,
            cost: 180,
            recycle: 164,
            sound: 'Explosion'
        },
        tower_b1: {
            damage: 24,
            distance: 64 * 64 * 72,
            fireRate: 2700,
            cost: 480,
            recycle: 432,
            sound: 'Explosion'
        },
        tower_unicorn: {
            up: 'tower_unicorn_up',
            damage: 30,
            distance: 64 * 64 * 20,
            fireRate: 30000,
            fireDuration: 50,
            cost: 600,
            recycle: 200,
            sound: 'Explosion',
            static: true,
            area: true,
            attack: 'fear'
        },
        tower_tentacle: {
            damage: 0,
            distance: 64 * 64 * 4,
            fireRate: 0,
            cost: 2000,
            recycle: 0,
            sound: 'Tulu',
            static: true,
            area: true,
            attack: 'slowdown'
        }
    },

    enemies: {
        enemy_a0: {
            speed: 2,
            energy: 39,
            reward: 20,
            sound:'ChefNain',
        },
        enemy_a1: {
            speed: 1,
            energy: 200,
            reward: 20,
            sound:'OhPinaise',
        },
        enemy_a2: {
            speed: 4,
            energy: 39,
            reward: 20,
            sound:'SousNain',
        },
        enemy_a3: {
            speed: 4,
            energy: 39,
            reward: 20,
            sound:'Froide',
        },
    },

    waves: {
        timeFirstWave: 5,     // Nombre de frames avant premiere vague
        unitsFirstWave: 2,      // Nombre d'unites dans la premiere vague
        timeNextWave: 10,      // Nombre de secondes avant les vagues (Hors premiere)
        switchEvery: 5,         // Changement nb unites => puissance
        strengthMul: 1.1,  // Augmentation de puissance (Toutes les switchEvery vagues)
        unitIncrease: 1,        // Augmentation par tour (+ Increment)
        waveGuests: 6,           // Premiere vague avec des guests
        ratioBasic: 0.9,        // Ratio de lama de type "basique"
    }
};