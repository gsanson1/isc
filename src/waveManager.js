var Waves = function(_gameScreen) {
    this.gameScreen = _gameScreen;

    this.nextWave = parameters.waves.timeFirstWave;
    
    this.wave = 0;
    this.units = parameters.waves.unitsFirstWave;
    this.strength = 1;
}

Waves.prototype = {
    nextStep: function() {
        this.nextWave--;
        if (this.nextWave <= 0) {
            this.nextWave = parameters.waves.timeNextWave;
            this.launchWave();
        }
    },

    launchWave: function() {
        this.wave++
        var randVal = this.wave >= parameters.waves.waveGuests ? 4 : 2;

        var enemy = null;
        for (var i = 0; i < this.units; i++) {
            enemy = new Enemy(this.gameScreen.game, this.gameScreen.map, -63, Tools.rand(704, 64), 'a' + Tools.rand(randVal));
            enemy.energy *= this.strength;
            enemy.currentEnergy = enemy.energy;
            this.gameScreen.enemies.push(enemy);
        }

        // Change values (next wave)
        if (this.wave % parameters.waves.switchEvery) {
            this.units = parameters.waves.unitsFirstWave + Math.floor(this.wave / parameters.waves.switchEvery) * parameters.waves.unitIncrease;
            this.strength *= parameters.waves.strengthMul;
        } else {
            this.units += parameters.waves.unitIncrease;
        }
    }
}
