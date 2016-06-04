var parameters = {

    initialCredit: 400,
    
    towers: {
        tower_a0: {
            damage: 1,
            distance: 64 * 64,
            fireRate: 6,
            cost: 50,
            recycle: 30
        },
        tower_a1: {
            damage: 1,
            distance: 64 * 64 * 4,
            fireRate: 3,
            cost: 75,
            recycle: 40
        },
        tower_b0: {
            damage: 2,
            distance: 64 * 64 * 9,
            fireRate: 2,
            cost: 75,
            recycle: 40
        },
        tower_b1: {
            damage: 2,
            distance: 64 * 64 * 16,
            fireRate: 1,
            cost: 100,
            recycle: 50
        }
    },

    enemies: {
        enemy_a0: {
            speed: 3,
            energy: 50,
            reward: 5
        },
        enemy_a1: {
            speed: 2,
            energy: 200,
            reward: 10
        },
        enemy_a2: {
            speed: 5,
            energy: 30,
            reward: 2
        }
    }
};