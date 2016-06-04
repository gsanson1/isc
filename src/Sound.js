/**
 * Created by san on 04/06/2016.
 */

// Gestionsound
// sound ambiance


function Preload() {


    game.load.audio('Plage','sounds/sf_plage_02.mp3'); // vas chercher le mp3
}

function Create() {
    music = game.add.audio('Plage'); // je charge ma music
    music.play();// je la joue
}
