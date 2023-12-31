import Configuration from "./Config.js";
import Player from "./Player.js";
document.addEventListener("DOMContentLoaded",function() {
    const config = new Configuration();
    const Sound_hit = new Audio();
    Sound_hit.src = "./public/Sounds/spaceInavders.wav"
    console.log(config,Sound_hit)
    Sound_hit.play();
    function Start(){
        config.currTelas.Drawing();
        config.currTelas.Atualiza();
        config.frames++
        requestAnimationFrame(Start);
    }
    Start();
});