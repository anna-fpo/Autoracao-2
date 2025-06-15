let numeros = [12, 3, 19, 7, 5, 1, 14, 17, 8, 15, 2, 18, 11, 20, 6, 9, 16, 10, 4, 13];

console.log("Array original:", numeros);

function bubbleSort(arr) {
  let temp;
  for(let i = 0; i < arr.length; i++) {                   // 1
    for(let j = 0; j < arr.length - 1 - i; j++) {         // 2
      if(arr[j] > arr[j + 1]) {                           // 3
        temp = arr[j];                                    // 4
        arr[j] = arr[j + 1];                              // 5
        arr[j + 1] = temp;                                // 6
      }
      
    }
  }
  return arr;                                             // 7
}

function bubbleSortDecrescente(arr) {
  let temp;
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - 1 - i; j++) {
      if(arr[j] < arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}


let ordenado = bubbleSort(numeros);
console.log("Array ordenado:", ordenado);


let ordenadoDecrescente = bubbleSortDecrescente([...numeros]); // outra cópia
console.log("Array decrescente:", ordenadoDecrescente);
