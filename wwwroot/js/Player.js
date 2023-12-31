import Bullet from "./Bullet.js";

// Declaração da classe Player
class Player {
    constructor() {
        // Propriedades do jogador
        this.Seletores();
        this.framesPerDirection = 17;
        this.name = "";
        this.score = 0;
        this.srcX=0;
        this.srcY=0;
        this.width=128,
        this.height= 128,
        this.RenderX=55,
        this.RenderY=35,
        this.x = this.canvas.width / 2.5;
        this.y= 117,
        this.speed = 8
        this.currentFrame = 0;
        this.totalFrames = 35;
        this.movementState = 'parado';
        this.framescurr;
        this.keys = {}; 
        this.canShoot = true; 
        this.bullets = []
    }

    Seletores() {
        this.canvas = document.querySelector('canvas');
    } 

    Animate(frames,sprites,bullet,enemy) {
        this.framescurr = frames
        const interval = 20
        const passinterval = frames % interval == 0
        if (passinterval) {
            let spriteSectionX;
            switch (this.movementState) {
                case 'andarEsquerda':
                    this.framesPerDirection = 17;
                    spriteSectionX = (0 * this.width);
                    break;
                case 'andarDireita':
                    this.framesPerDirection = 17;
                    spriteSectionX = this.framesPerDirection * this.width;
                    break;
                case 'parado':
                    this.framesPerDirection = 20;
                    spriteSectionX = (2*this.framesPerDirection) * this.width;
                    break;
                default:
                    spriteSectionX = 0;
            }
            
             // Atualizar as coordenadas de recorte para a próxima imagem na seção do spritesheet
            this.srcX = spriteSectionX + (this.currentFrame % this.framesPerDirection) * this.width;
            this.srcY = 0;
    
            // Avançar para o próximo quadro
            this.currentFrame++;
    
            // Verificar se atingiu o final da seção do spritesheet, reiniciar se necessário
            if (this.currentFrame >= this.framesPerDirection) {
                this.currentFrame = 0;
            }
        }

        this.updateAndDrawBullets(bullet);
        this.checkBulletCollisionWithMatrix(enemy)
        this.Drawing(sprites);
        this.DrawScoore();
    }

    Eventos(){
        document.addEventListener('keydown', event => this.Play(event));
        document.addEventListener('keyup', event => this.ReleaseKey(event));
    }

    TakeItem(player,item){
        // Lógica para verificar se o jogador colidiu com um item
        const ColidX = player.y
        item = item.y + item.height
        if(item>=ColidX){
            return true;
        }
        return false;
    }

    Drawing(sprites){
        sprites.src = './public/Player/strip_player.png';
        const ctx = this.canvas.getContext('2d');
        ctx.drawImage(
            sprites,
            this.srcX,this.srcY,
            this.width,this.height, // Tamanho do recorte na sprite
            this.x,this.y,// Posição no canvas
            this.RenderX,this.RenderY // Tamanho da imagem no canvas
        );
    }

    DrawScoore(){
        const ctx = this.canvas.getContext('2d');
        ctx.font = `30px VT323'`;
        ctx.fillStyle = "white";
        ctx.fillText("Scoore: " + this.score, 75,20);
    }

    Play(event) {
        // Lógica para o jogador jogar
        this.keys[event.code] = true;
        if (this.keys[event.code]) {
            if (this.keys['Keya'] || this.keys['KeyA'] || this.keys['ArrowLeft']) {
                this.LeftMove(event);
            }
            if (this.keys['Keyd'] || this.keys['KeyD'] || this.keys['ArrowRigth']) {
                this.RightMove(event);
            }
        }
        if ((this.keys['Keyw'] || this.keys['KeyW'] || this.keys['ArrowUp']) && this.canShoot) {
            this.shoot();
            this.canShoot = false;
        }
    }

    shoot() {
        const bullet = new Bullet(this.x, this.y);
        this.bullets.push(bullet);
    }

    updateAndDrawBullets(shoot) {
        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            if (bullet !== undefined) {
                bullet.update();
                bullet.draw(shoot);
                if (bullet.offScreen()) {
                    this.bullets.splice(i, 1);
                    i--;
                }
            }
        }
    }


    ReleaseKey(event) {
        this.keys[event.code] = false; // Marca a tecla como solta
        this.movementState = 'parado'; // Define o estado de movimento como parado
        if (event.code === 'KeyW' || event.code === 'Keyw' || event.code === 'ArrowUp') {
            this.canShoot = true;
        }
    }

    LeftMove(event){
        if(this.keys[event.code]){
            this.movementState ='andarEsquerda';
            let move = this.speed * (this.x / this.canvas.height);
            if (this.x - move >= 0) { // Verifica se o movimento não ultrapassa o limite esquerdo do canvas
                this.x -= move;
            } else {
                this.x = 0; // Define a posição como 0 para evitar que o jogador saia do canvas
                move = 0
            }
        }
    }

    RightMove(event){
        if(this.keys[event.code])
            this.movementState ='andarDireita';
            let move = this.speed * (this.x / this.canvas.height);
            if (this.x + move <= this.canvas.width -55) { // Verifica se o movimento não ultrapassa o limite direito do canvas
                this.x += move;
            } else {
                this.x = this.canvas.width - (this.width-55); 
                move = 0
            }
        }

    updateScore() {
        // Lógica para atualizar a pontuação do jogador
        this.score += 100;
    }

    checkBulletCollisionWithMatrix(matrix) {
    for (let i = 0; i < this.bullets.length; i++) {
        const bullet = this.bullets[i];
        if (bullet !== undefined) {
            for (let row = 0; row < matrix.length; row++) {
                for (let col = 0; col < matrix[row].length; col++) {
                    const element = matrix[row][col];
                    // Verifica a colisão entre a bala e o elemento da matriz
                    if (this.checkCollision(bullet, element)) {
                        // Realize a lógica desejada quando houver colisão
                        // Por exemplo, remova a bala da matriz ou aplique algum efeito
                        this.bullets.splice(i, 1);
                        matrix[row][col].status = 0;
                        this.updateScore(); 
                        i--; // Ajuste o índice após remover um elemento
                        break; // Saia do loop interno, pois a bala colidiu com apenas um elemento
                    }
                }
            }
        }
    }
}

    checkCollision(rect1, rect2) {
        if(rect1 != undefined && rect2 != undefined){
            return rect1.y < rect2.y + 20
                && rect1.y + rect1.height > rect2.y
                && rect1.x < rect2.x + 20
                && rect1.x + rect1.width -100 > rect2.x;
        }
        return false
    }
}

// Exportação da classe Player
export default Player;
