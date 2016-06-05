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
        for (var i = 0; i < this.units; i++) {
            enemy = new Enemy(this.gameScreen.game, this.gameScreen.map, -63, Tools.rand(704, 64), 'a' + Tools.rand(randVal));
            enemy.energy *= this.strength;
            enemy.currentEnergy = enemy.energy;
            this.gameScreen.enemies.push(enemy);
        }

        // Change values (next wave)
        if (this.countWave % parameters.waves.switchEvery == 0) {
            this.units = parameters.waves.unitsFirstWave + Math.floor(this.countWave / parameters.waves.switchEvery) * parameters.waves.unitIncrease;
            this.strength *= parameters.waves.strengthMul;
        } else {
            this.units += parameters.waves.unitIncrease;
        }

        this.gameScreen.time.events.add(Phaser.Timer.SECOND * parameters.waves.timeNextWave, this.launchWave, this);
    }
}
