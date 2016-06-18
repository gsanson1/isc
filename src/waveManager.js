var WaveManager = function(_gameScreen) {
    this.gameScreen = _gameScreen;

    this.countWave = 0;
    this.units = parameters.waves.unitsFirstWave;
    this.strength = 1;
}

WaveManager.prototype = {
    launchWave: function() {
        this.countWave++
        var randVal = this.countWave >= parameters.waves.waveGuests ? 4 : 2;

        var enemy = null;
        var enemyNum;
        for (var i = 0; i < this.units; i++) {
            if (this.countWave % parameters.waves.bossWave == 0) { // Boss wave
                enemyNum = 1;
            } else if (Math.random() < parameters.waves.ratioBasic) { // Basic llamas
                enemyNum = 0; // Basic
            } else if (randVal == 2) {
                enemyNum = 1;
            } else {
                enemyNum = Tools.rand(randVal, 1);
            }

            enemy = new Enemy(this.gameScreen.game, this.gameScreen.map, -63, Tools.rand(704, 64), 'a' + enemyNum);
            enemy.energy *= this.strength;
            enemy.currentEnergy = enemy.energy;
            this.gameScreen.enemies.push(enemy);
        }

        // Change values (next wave)
        if (this.countWave % parameters.waves.switchEvery == 0) {
            this.units = parameters.waves.unitsFirstWave + Math.floor(this.countWave / parameters.waves.switchEvery);
            this.strength *= parameters.waves.strengthMul;
        } else {
            this.units += parameters.waves.unitIncrease;
        }
    }
}
