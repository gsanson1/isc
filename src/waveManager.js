var WaveManager = function(_gameScreen) {
    this.gameScreen = _gameScreen;

    this.nextWave = parameters.waves.timeFirstWave;

    this.countWave = 0;
    this.units = parameters.waves.unitsFirstWave;
    this.strength = 1;
}

WaveManager.prototype = {
    nextStep: function(t) {
        //this.nextWave--;
        //if (this.nextWave <= 0) {
        //    this.nextWave = parameters.waves.timeNextWave;
        //    this.launchWave();
        //}

        var tInSec = Math.floor(t / 1000);
        if (this.nextWave < tInSec) {
            this.nextWave = tInSec + parameters.waves.timeNextWave;
            this.launchWave();
        }
    },

    launchWave: function() {
        this.countWave++
        var randVal = this.countWave >= parameters.waves.waveGuests ? 4 : 2;

        var enemy = null;
        for (var i = 0; i < this.units; i++) {
            enemy = new Enemy(this.gameScreen.game, this.gameScreen.map, -63, Tools.rand(704, 64), 'a' + Tools.rand(randVal));
            enemy.energy *= this.strength;
            enemy.currentEnergy = enemy.energy;
            this.gameScreen.enemies.push(enemy);
        }

        // Change values (next wave)
        if (this.countWave % parameters.waves.switchEvery) {
            this.units = parameters.waves.unitsFirstWave + Math.floor(this.countWave / parameters.waves.switchEvery) * parameters.waves.unitIncrease;
            this.strength *= parameters.waves.strengthMul;
        } else {
            this.units += parameters.waves.unitIncrease;
        }
    }
}
