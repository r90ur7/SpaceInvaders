import Configuration from "./Config.js";
document.addEventListener("DOMContentLoaded",function() {
    const config = new Configuration();
    const Sound_hit = new Audio();
    Sound_hit.src = "./public/Sounds/spaceInavders.wav";
    Sound_hit.volume = 0.1;
    Sound_hit.loop = true;
    Sound_hit.addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
    });
    Sound_hit.play();
    function Start(){
        Sound_hit.volume = 0.1;
        Sound_hit.play();
        config.currTelas.Drawing();
        config.currTelas.Atualiza();
        config.frames++
        requestAnimationFrame(Start);
    }
    Start();
});