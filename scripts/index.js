// Our code!!!

var ISC = {};


ISC.launcher = function() {
    ISC.game = new Phaser.Game(1536, 896, Phaser.AUTO, '', { preload: ISC.preload, create: ISC.create });
}

ISC.preload = function() {

}


ISC.create = function() {
    
}



document.addEventListener("DOMContentLoaded", ISC.launcher, false);