import Configuration from "./Config.js";
import Player from "./Player.js";
document.addEventListener("DOMContentLoaded",function() {
    const config = new Configuration();
    console.log(config)
    function Start(){
        config.currTelas.Drawing();
        config.currTelas.Atualiza();
        config.frames++
        requestAnimationFrame(Start);
    }
    Start();
});