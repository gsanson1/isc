var parameters = {

    lives: 5,
    initialCredit: 4000,
    
    towers: {
        tower_a0: {
            damage: 1,
            distance: 64 * 64,
            fireRate: 100,
            cost: 240,
            recycle: 120
        },
        tower_a1: {
            damage: 1,
            distance: 64 * 64 * 4,
            fireRate: 50,
            cost: 400,
            recycle: 200
        },
        tower_b0: {
            damage: 2,
            distance: 64 * 64 * 9,
            fireRate: 200,
            cost: 200,
            recycle: 120
        },
        tower_b1: {
            damage: 4,
            distance: 64 * 64 * 16,
            fireRate: 200,
            cost: 200,
            recycle: 200
        }
        // tower_obstacle: {
        //     damage: 0,
        //     distance: 0,
        //     fireRate: 0,
        //     cost: 60,
        //     recycle: 30
        // }
    },

    enemies: {
        enemy_a0: {
            speed: 3,
            energy: 50,
            reward: 20
        },
        enemy_a1: {
            speed: 2,
            energy: 200,
            reward: 20
        },
        enemy_a2: {
            speed: 5,
            energy: 30,
            reward: 20
        }
    }
};