void setup(){

}

void draw(){
// ... (dentro da função draw)
background(220);

stroke(170);                 // define cor de traço (cinza escuro) para as linhas
// Eixo X: linha horizontal ao longo da borda superior
line(0, 0, width, 0);
// Eixo Y: linha vertical ao longo da borda esquerda
line(0, 0, 0, height);

fill(0);                     // define cor preta para o texto
// Rótulos dos eixos nos cantos (X no canto superior direito, Y no inferior esquerdo)
text('X', width - 10, 10);
text('Y', 5, height - 5);

// Condição: verifica se o mouse está pressionado
if (mouseIsPressed === true) {
  fill(0);   // preto, se mouse pressionado
} else {
  fill(255); // branco, caso contrário
}

// Desenha o círculo seguindo a posição do mouse
circle(mouseX, mouseY, 50);
text("mouseX: " + mouseX, 10, 15);
text("mouseY: " + mouseY, 10, 30);

}

