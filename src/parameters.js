var parameters = {

    lives: 5,
    initialCredit: 400,
    towers: {
        tower_obstacle: {
            damage: 0,
            distance: 0,
            fireRate: 0,
            cost: 10,
            recycle: 0
        },
        tower_a0: {
            damage: 3,
            distance: 64 * 64 * 3,
            fireRate: 100,
            cost: 150,
            recycle: 0
        },
        tower_a1: {
            damage: 4,
            distance: 64 * 64 * 3,
            fireRate: 80,
            cost: 450,
            recycle: 0
        },
        tower_b0: {
            damage: 15,
            distance: 64 * 64 * 12,
            fireRate: 1500,
            cost: 150,
            recycle: 0
        },
        tower_b1: {
            damage: 20,
            distance: 64 * 64 * 20,
            fireRate: 1500,
            cost: 450,
            recycle: 0
        },
        tower_b2: {
            damage: 30,
            distance: 64 * 64 * 20,
            fireRate: 2000,
            cost: 200,
            recycle: 200
        }
    },

    enemies: {
        enemy_a0: {
            speed: 2,
            energy: 39,
            reward: 20
        },
        enemy_a1: {
            speed: 1,
            energy: 200,
            reward: 20
        },
        enemy_a2: {
            speed: 3,
            energy: 39,
            reward: 20
        },
        enemy_a3: {
            speed: 3,
            energy: 30,
            reward: 20
        }
    },

    waves: {
        timeFirstWave: 5,     // Nombre de frames avant premiere vague
        unitsFirstWave: 3,      // Nombre d'unites dans la premiere vague
        timeNextWave: 10,      // Nombre de secondes avant les vagues (Hors premiere)
        switchEvery: 10,         // Changement nb unites => puissance
        strengthMul: 1.1,  // Augmentation de puissance (Toutes les switchEvery vagues)
        unitIncrease: 2,        // Augmentation par tour (+ Increment)
        waveGuests: 6,           // Premiere vague avec des guests
        ratioBasic: 0.9         // Ratio de lama de type "basique"
    }
};