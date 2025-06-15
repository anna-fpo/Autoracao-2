const linhasPorPagina = 5;
let paginaAtual = 1;

function exibirPaginaTabela(pagina) {
  const tabela = document.getElementById("dadosTabela");
  const linhas = Array.from(tabela.rows);
  const totalPaginas = Math.ceil(linhas.length / linhasPorPagina);
  paginaAtual = pagina;

  linhas.forEach((linha, index) => {
    linha.style.display = (index >= (pagina - 1) * linhasPorPagina && index < pagina * linhasPorPagina) ? '' : 'none';
  });

  desenharBotoesPaginacao(totalPaginas);
}

function desenharBotoesPaginacao(totalPaginas) {
  const container = document.getElementById("paginacao");
  container.innerHTML = '';

  if (paginaAtual > 1) {
    const btnAnt = document.createElement('button');
    btnAnt.textContent = 'Anterior';
    btnAnt.onclick = () => exibirPaginaTabela(paginaAtual - 1);
    container.appendChild(btnAnt);
  }

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === paginaAtual) btn.disabled = true;
    btn.onclick = () => exibirPaginaTabela(i);
    container.appendChild(btn);
  }

  if (paginaAtual < totalPaginas) {
    const btnProx = document.createElement('button');
    btnProx.textContent = 'Próxima';
    btnProx.onclick = () => exibirPaginaTabela(paginaAtual + 1);
    container.appendChild(btnProx);
  }
}

// Carregar a primeira página ao abrir
window.onload = () => {
  exibirPaginaTabela(1);
};


function ordenarTabela() {
  let tabela = document.getElementById("dadosTabela");
  Array.from(tabela.rows)
    .sort((a, b) => {
      let idadeA = parseInt(a.cells[1].textContent);
      let idadeB = parseInt(b.cells[1].textContent);
      if (idadeA !== idadeB) {
        return idadeA - idadeB;
      } else {
        return a.cells[0].textContent.localeCompare(b.cells[0].textContent);
      }
    })
    .forEach(tr => tabela.appendChild(tr));
}

function buscarTabela() {
  let filtro = document.getElementById("busca").value.toUpperCase();
  let tabela = document.getElementById("dadosTabela");

  Array.from(tabela.rows).forEach(row => {
    let nome = row.cells[0].textContent.toUpperCase();
    let idade = row.cells[1].textContent.toUpperCase();

    let corresponde = nome.startsWith(filtro) || idade.startsWith(filtro);

    row.style.display = corresponde ? '' : 'none';
  });
}


function ordenar(pessoas) {
  return pessoas.sort((a, b) => {
    if (a.idade !== b.idade) {
      return a.idade - b.idade; // ordena por idade crescente
    } else {
      return a.nome.localeCompare(b.nome); // se empate, ordena por nome
    }
  });
}
