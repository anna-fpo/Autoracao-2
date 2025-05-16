
let posicoes = [];    // array de vetores de posição das bolinhas
let velocidades = []; // array de vetores de velocidade das bolinhas
let numBolas = 10;    // quantidade de bolinhas (podemos alterar para experimentar)
let raio = 20;        // raio de cada bolinha (diâmetro será 40)

function setup() {
  createCanvas(600, 400); // cria um canvas de 600x400 pixels
  // Inicializa posições e velocidades
  for (let i = 0; i < numBolas; i++) {
    // Posição aleatória dentro dos limites do canvas
    let pos = createVector(random(0, width), random(0, height));
    // Velocidade aleatória: componente x entre -3 e 3, componente y entre -3 e 3
    let vel = createVector(random(-3, 3), random(-3, 3));
    // Adiciona esses vetores aos arrays
    posicoes.push(pos);
    velocidades.push(vel);
  }
}

function draw() {
  background(51); // limpa a tela com um fundo cinza escuro (51 é um tom de cinza)

  fill(255, 100, 100);   // define a cor de preenchimento (vermelho claro) para as bolinhas
  noStroke();            // sem contorno nas bolinhas

  // Loop através de todas as bolinhas
  for (let i = 0; i < numBolas; i++) {
    let pos = posicoes[i];
    let vel = velocidades[i];

    // Atualiza posição somando velocidade
    pos.add(vel);

    // Verifica colisões com as bordas e inverte velocidade se necessário
    if (pos.x - raio < 0 || pos.x + raio > width) {
      vel.x = vel.x * -1;
    }
    if (pos.y - raio < 0 || pos.y + raio > height) {
      vel.y = vel.y * -1;
    }

    // Desenha a bolinha
    ellipse(pos.x, pos.y, raio*2, raio*2);
  }
}

