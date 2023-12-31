class Inimigo {
    constructor(){
        this.Seletores();
        this.enemyX = 0
        this.enemyY = 0
        this.enemies = [];
        this.framesPerDirection = 16;
        this.currentFrame = 0;
        this.totalFrames = 35;
        this.enemyWidth = 128;
        this.enemyHeight = 128;
        this.enemyRowCount = 3;
        this.enemyColumnCount = 3;
        this.RenderX = 55
        this.RenderY = 35
        this.srcX=0;
        this.srcY=0;
        this.movementState = 'andarDireita';
        this.createEnemies()
        this.moveEnemies();
    }

    Seletores() {
        this.canvas = document.querySelector('canvas');
    } 

    createEnemies() {
        for (let c = 0; c < this.enemyColumnCount; c++) {
            this.enemies[c] = [];
            for (let r = 0; r < this.enemyRowCount; r++) {
                this.enemies[c][r] = { x: this.enemyX, y:  this.enemyY, status: 1,movementState:this.movementState };
            }
        }
        console.log("enemies created",this.enemies)
    }

    Animate(frames,sprites){
        const interval = 20;
        const passInterval = frames % interval === 0;
        if (passInterval) {
            this.currentFrame++;
            if (this.currentFrame >= this.framesPerDirection) {
                this.currentFrame = 0;
            }
        }
        this.srcX = (this.currentFrame % this.framesPerDirection) * this.enemyWidth;
        this.Drawing(sprites);
    }

    moveEnemies() {
        for (let columns = 0; columns < this.enemyColumnCount; columns++) {
            for (let rows = 0; rows < this.enemyRowCount; rows++) {
                if (this.enemies[columns][rows].status === 1) {
                    this.enemyX = Math.round(columns * (this.enemyWidth / 3));
                    this.enemyY = Math.round(rows * (this.enemyHeight / 5));
                    this.enemies[columns][rows].x = this.enemyX; // Atualize a posição x
                    this.enemies[columns][rows].y = this.enemyY; // Atualize a posição y
                    console.log("enemies curr",this.enemies,this.enemyX,this.enemyY)
                }
            }
        }
    }

    Update(enemy){
        this.enemyY = enemy.y
        if(enemy.movementState === "andarDireita"){
            if(enemy.x <= this.canvas.width - 55){
                enemy.x++
            }else{
                enemy.movementState = "andarEsquerda"
                for (let columns = 0; columns < this.enemyColumnCount; columns++){
                    for (let rows = 0; rows < this.enemyRowCount; rows++){
                        this.enemies[columns][rows].y +=  10
                        this.enemies[columns][rows].movementState = "andarEsquerda";
                    }
                }
            }
        }else{
            if(enemy.x >= 0){
                enemy.x--
            }else{
                enemy.movementState = "andarDireita"
                for (let columns = 0; columns < this.enemyColumnCount; columns++){
                    for (let rows = 0; rows < this.enemyRowCount; rows++){
                        this.enemies[columns][rows].y +=  10
                        this.enemies[columns][rows].movementState = "andarDireita";
                    }
                }
            }
        }
    }

    Drawing(sprites) {
        sprites.src = './public/Enemies/strip_saucer.png';
        const ctx = this.canvas.getContext('2d');

        for (let columns = 0; columns < this.enemyColumnCount; columns++) {
            for (let rows = 0; rows < this.enemyRowCount; rows++) {
                if (this.enemies[columns][rows].status === 1) {
                    this.Update(this.enemies[columns][rows]);
                    ctx.beginPath();
                    ctx.drawImage(
                        sprites,
                        this.srcX, this.srcY,
                        this.enemyWidth, this.enemyHeight,
                        this.enemies[columns][rows].x, this.enemies[columns][rows].y + 20,
                        this.RenderX, this.RenderY
                    );
                    ctx.closePath();
                }
            }
        }
    }
    Colision(player,enemy){
        // Lógica para verificar se o inimigo colidiu com o jogador
        // console.log(player,enemy)
        const ColidPlayer = player.y + player.height 
        const ColidEnemy = enemy.enemyY + (enemy.enemyHeight + 16)
        console.log(ColidEnemy,ColidPlayer,enemy.enemyY)
        if(ColidEnemy>=ColidPlayer){
            return true;
        } else {
            return false;
        }
    }
}
export default Inimigo;