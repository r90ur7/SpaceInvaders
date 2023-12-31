export default class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.width = 128;
        this.height = 128;
        this.canvas = document.querySelector('canvas');
    }

    draw(shoot) {
        const ctx = this.canvas.getContext('2d');
        const sprites = shoot;
        sprites.src = './public/FX/projectile_bolt_red.png';
        ctx.drawImage(
            sprites,
            0,0,
            this.width -96,this.height, // Tamanho do recorte na sprite
            this.x,this.y, // Posição no canvas
            (this.width/2),(this.height/2)// Tamanho da imagem no canvas
        );
        
    }

    update() {
        this.y -= this.speed;
    }

    offScreen() {
        return this.y < 0;
    }
}//this.x, this.y, this.width, this.height