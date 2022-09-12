// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 80;

// variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 155;
let velocidadeYOponente;

let chanceDeErrar = 0;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();    
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();  
  verificaColisaoRaquete(xRaquete, yRaquete);  
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);  
  movimentaRaqueteOponente();
  incluiPlacar();   
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if ( xBolinha + raio > width || xBolinha - raio < 0 ) {
    velocidadeXBolinha *= -1;
  }
  if ( yBolinha + raio > height || yBolinha - raio < 0 ) {
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x, y){  rect(x,y,comprimentoRaquete,alturaRaquete);
}

function movimentaRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
  }
  if (keyIsDown(83)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu =
  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

// ATIVAR MODO MULTIPLAYER
// function movimentaRaqueteOponente(){
//   if (keyIsDown(UP_ARROW)){
//     yRaqueteOponente -= 10;
//   }
//   if (keyIsDown(DOWN_ARROW)){
//     yRaqueteOponente += 10;
//   }
// }

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}



function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);  
  fill(255,140,0);
  rect(150, 10, 40, 20, 5);
  fill(255);
  text(meusPontos, 170, 26);
  fill(255,140,0);
  rect(450, 10, 40, 20, 5);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
  
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
