let numeros = [12, 3, 19, 7, 5, 1, 17, 14, 8, 15, 2, 18, 17, 20, 6, 9, 16, 10, 4, 13, 17, 5];

function buscaLinear(arr, valor) {
  let indices = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === valor) {
      indices.push(i);
    }
  }
  return indices;
}

console.log("Array:", numeros);

// Testando com um valor que aparece mais de uma vez
let valorProcurado = 17;
let indices = buscaLinear(numeros, valorProcurado);

if(indices.length > 0) {
  console.log(`Valor ${valorProcurado} encontrado nas posições: ${indices}`);
} else {
  console.log(`Valor ${valorProcurado} não encontrado`);
}

// Testando com um valor que NÃO existe no array
let valorAusente = 42;
let indices2 = buscaLinear(numeros, valorAusente);

if(indices2.length > 0) {
  console.log(`Valor ${valorAusente} encontrado nas posições: ${indices2}`);
} else {
  console.log(`Valor ${valorAusente} não encontrado`);
}
