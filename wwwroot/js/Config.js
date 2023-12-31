import Inimigo from "./Inimigo.js";
import Player from "./Player.js";
class Configuration {
  constructor() {
    this.sprites = new Image();
    this.PLayerSPrites = new Image();
    this.PLayerSBullet = new Image();
    this.InimigoSPrites = new Image();
    this.frames = 0;
    this.currTelas = {};
    this.Player = new Player();
    this.Inimigos = new Inimigo();
    this.Seletores();
    this.Eventos();
    this.Bg1 = { x: 0, y: 0, speed: 0.5 };
    this.Bg2 = { x: this.canvas.width, y: 0, speed: 0.5 };
    this.Bg= {
      srcX:0,
      srcY:0,
      width: 1024,
      height: 1280,
      RenderX:300,
      RenderY:200,
      x: 0,
      y: 0,
      speed : 0.5
    }
    this.ctx= this.canvas.getContext('2d'),
    this.Config ={
      conf :this,
      Telas:{
        inicio:{
          nome: "inicio",
          init(){

          },
          Drawing(){
            this.conf.BgDraw();
            this.conf.GetReadyToTart()
          },
          Atualiza(){
            this.conf.BgUpdate();
            this.conf.Player.Animate(this.conf.frames,this.conf.PLayerSPrites);
          },
          Click(){
            this.conf.HandleTelas(this.conf.Config.Telas.jogo,this.conf)
          }
        },
        jogo:{
          nome: "Jogo",
          init(){
            this.conf.Player.Eventos();
          },

          Drawing(){
            this.conf.BgDraw();
            this.conf.Player.Animate(this.conf.frames,this.conf.PLayerSPrites,this.conf.PLayerSBullet,this.conf.Inimigos.enemies);
            this.conf.Inimigos.Animate(this.conf.frames,this.conf.InimigoSPrites);
          },

          Atualiza(){
            if(this.conf.Inimigos.Colision(this.conf.Player,this.conf.Inimigos)){
                  this.conf.HandleTelas(this.conf.Config.Telas.Fim,this.conf);
              }
              this.conf.BgUpdate();
          }
        },

        Fim:{
          nome: "Fim",
          init(){
          },
          Drawing(){
            this.conf.BgDraw();
            this.conf.GameOver()
          },
          Atualiza(){
            this.conf.BgUpdate();
            this.conf.GameOverScoore();
          },
          Click(){
            this.conf.ResetConf();
            this.conf.HandleTelas(this.conf.Config.Telas.inicio,this.conf)
          }
        },
      }
    }
    this.HandleTelas(this.Config.Telas.inicio,this);
  }


  // Métodos da classe
  Seletores() {
    this.canvas = document.querySelector('canvas');
  }


  GetReadyToTart(){
        this.ctx.font = '28px "VT323"';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Press Any Button To Start`, this.canvas.width / 2, this.canvas.height / 2);
  }
  GameOver(){
    this.ctx.font = '28px "VT323"';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    const text = "Game Over Press any button to restart";
    let x = this.canvas.width / 2;
    let y = this.canvas.height / 3;
    const maxWidth = this.canvas.width;
    const lineHeight = 28;
    let words = text.split(' ');
    let line = '';
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = this.ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        this.ctx.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, x, y);
  }
  GameOverScoore(){
      const ctx = this.canvas.getContext('2d');
        ctx.font = `30px VT323'`;
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";
        ctx.fillText("Scoore: " + this.Player.score, 150,100);
  }

  Eventos() {
    this.canvas.addEventListener('click', () => {
        if (this.currTelas.Click) {
            this.currTelas.Click();
        }
    });
}

  ResetConf(){
    this.frames = 0;
    this.Player = new Player();
    this.Inimigos = new Inimigo();
    this.Seletores();
    if (this.currTelas.init) {
        this.currTelas.init();
    }
  }
  BgUpdate() {
    // Mover as imagens de fundo
    this.Bg1.x -= this.Bg1.speed;
    this.Bg2.x -= this.Bg2.speed;

    // Se a primeira imagem estiver completamente fora da tela
    if (this.Bg1.x <= -this.canvas.width) {
      // Reposicione a primeira imagem para o final da segunda imagem
      this.Bg1.x = this.Bg2.x + this.canvas.width;
    }

    // Se a segunda imagem estiver completamente fora da tela
    if (this.Bg2.x <= -this.canvas.width) {
      // Reposicione a segunda imagem para o final da primeira imagem
      this.Bg2.x = this.Bg1.x + this.canvas.width;
    }
  }


  BgDraw() {
    // Desenhe as duas imagens de fundo
    this.drawImage(this.Bg1);
    this.drawImage(this.Bg2);

    // Crie um gradiente radial
    let gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
    );

    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(Bg) {
    const sprites = this.sprites;
    sprites.src = './public/Backgrounds/Background1.png';
    this.ctx.drawImage(
      sprites,
      this.Bg.srcX, this.Bg.srcY,
      this.Bg.width, this.Bg.height, // Tamanho do recorte na sprite
      Bg.x, Bg.y, // Posição no canvas
      this.Bg.RenderX, this.Bg.RenderY // Tamanho da imagem no canvas
      );
    }

  HandleTelas(newtela,instance) {
    newtela.conf = instance;
    this.currTelas = newtela;
    if (this.currTelas.init) {
        this.currTelas.init();
    }
  }

}
export default Configuration
