/**
 * Introdução aos Arrays em JavaScript com P5.js
 * Exemplo prático de várias bolinhas rebatendo nas bordas do canvas.
 * Cada bolinha possui uma posição e uma velocidade armazenadas em arrays.
 */

new p5((sketch) => {  // Cria uma nova instância do p5.js
     // Arrays para armazenar as posições e velocidades das bolinhas
    let posicoes = [];
    let velocidades = [];
    let numBolinhas = 5;  // Número de bolinhas no exemplo

    sketch.setup = () => {
        sketch.createCanvas(640, 480).parent('vetores');

        // Inicializa posições e velocidades usando arrays
        for (let i = 0; i < numBolinhas; i++) {
            // Adiciona uma posição inicial aleatória ao array posicoes
            posicoes.push(sketch.createVector(
                sketch.random(30, sketch.width - 30),
                sketch.random(30, sketch.height - 30)
            ));

            // Adiciona uma velocidade inicial aleatória ao array velocidades
            velocidades.push(sketch.createVector(
                sketch.random(1, 3),
                sketch.random(1, 3)
            ));
        }
    };

    

    sketch.draw = () => {
        sketch.background(240);

        // Percorre todos os elementos do array usando um loop
        for (let i = 0; i < numBolinhas; i++) {
            
            // Atualiza posição da bolinha somando o vetor velocidade
            posicoes[i].add(velocidades[i]);

            // Verifica colisão horizontal com as bordas e inverte a direção se necessário
            if (posicoes[i].x > sketch.width || posicoes[i].x < 0) {
                velocidades[i].x *= -1;
            }

            // Verifica colisão vertical com as bordas e inverte a direção se necessário
            if (posicoes[i].y > sketch.height || posicoes[i].y < 0) {
                velocidades[i].y *= -1;
            }

            // Desenha bolinhas
            sketch.fill(255, 0, 0);
            sketch.ellipse(posicoes[i].x, posicoes[i].y, 30, 30);

            // Exibe vetor velocidade (representação gráfica simplificada)
            sketch.stroke(0);
            sketch.line(
                posicoes[i].x,
                posicoes[i].y,
                posicoes[i].x + velocidades[i].x * 10,
                posicoes[i].y + velocidades[i].y * 10
            );
        }
        // Exibe os arrays de posições e velocidades no Console
        // console.log(posicoes);
        // console.log(velocidades);

        // Exibe as posições e velocidades no console a cada 60 frames (~1 segundo)
        // if (sketch.frameCount % 60 === 0) { // A cada 60 frames (~1 segundo)
        //     for (let i = 0; i < numBolinhas; i++) {
        //         console.log(`Bolinha ${i + 1}: Posição = (${posicoes[i].x.toFixed(2)}, ${posicoes[i].y.toFixed(2)}), Velocidade = (${velocidades[i].x.toFixed(2)}, ${velocidades[i].y.toFixed(2)})`);
        //     }
        // }
        
        // Exibe as posições e velocidades na tela
        // sketch.fill(0);
        // sketch.textSize(12);
        // sketch.text('Posições: ' + posicoes.map(p => `(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`).join(', '), 10, 20);
        // sketch.text('Velocidades: ' + velocidades.map(v => `(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`).join(', '), 10, 40);

    };
});