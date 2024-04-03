// ## Iterator Methods - Quando invocados iteram sobre os elementos de um array, podendo retornar um novo array ou não

// ### FOREACH - executa uma função para cada elemento do array. O forEach não retorna um novo array.
// ex.:
const arr1 = [1, 2, 3];
arr1.forEach((item, index, array) => { // item é o elemento, index é o índice, array é o array original
  console.log(item, index, array); // 1 0 [1, 2, 3], 2 1 [1, 2, 3], 3 2 [1, 2, 3]
});

// ### FILTER - retorna um novo array somente contendo os elementos que retornaram true na função passada como argumento. Se não encontrar, retorna um array vazio
// ex.:
const arr2 = [1, 2, 3];
const filtered = arr2.filter((item, index, array) => { // item é o elemento, index é o índice, array é o array original
  return item > 1; // retorna um novo array com os elementos maiores que 1
});
console.log(filtered); // [2, 3]

// ### FIND - retorna o primeiro elemento que retornou true na função passada como argumento. Se não encontrar, retorna undefined
// ex.:
const arr3 = [1, 2, 3];
const found = arr3.find((item, index, array) => { // item é o elemento, index é o índice, array é o array original
  return item > 1; // retorna o primeiro elemento maior que 1
});
console.log(found); // 2

// ### SOME - retorna true se pelo menos um elemento retornou true na função passada como argumento. Se não encontrar, retorna false
// ex.:
const arr4 = [1, 2, 3];
const some = arr4.some((item, index, array) => { // item é o elemento, index é o índice, array é o array original
  return item > 1; // retorna true se encontrar um elemento maior que 1
});
console.log(some); // true

// ### MAP - retorna um novo array com o resultado da função passada como argumento para cada elemento.
// O novo array terá o mesmo length do array original.
// ex.:
const arr5 = [1, 2, 3];
const mapped = arr5.map((item, index, array) => { // item é o elemento, index é o índice, array é o array original
  return item * 2; // retorna um novo array com os elementos multiplicados por 2
});
console.log(mapped); // [2, 4, 6]

// ### REDUCE - Função de acumulação, executa uma função para cada elemento do array, retornando um único valor.
// ex.:
const arr6 = [1, 2, 3];
const reduced = arr6.reduce((accumulator, item, index, array) => { // accumulator é o acumulador, item é o elemento, index é o índice, array é o array original
  return accumulator + item; // retorna a soma de todos os elementos
}, 0); // 0 é o valor inicial do acumulador
console.log(reduced); // 6
// O valor inicial do acumulador é opcional, se não for passado, o acumulador inicia com o primeiro elemento do array
// ex.:
const arr7 = [1, 2, 3];
const reduced2 = arr7.reduce((accumulator, item, index, array) => { // accumulator é o acumulador, item é o elemento, index é o índice, array é o array original
  return accumulator + item; // retorna a soma de todos os elementos
});
console.log(reduced2); // 6
// O reduce é poderoso também para iterar sobre arrays de objetos e retornar um novo objeto fazendo operações complexas.
// ex.:
const arr8 = [
  { name: 'Renan', age: 29 },
  { name: 'Lais', age: 27 },
  { name: 'Luna', age: 1 },
];
const reduced3 = arr8.reduce((accumulator, item, index, array) => { // accumulator é o acumulador, item é o elemento, index é o índice, array é o array original
  accumulator[item.name] = item.age; // retorna um objeto com o nome como chave e a idade como valor
  return accumulator;
}, {}); // {} é o valor inicial do acumulador
console.log(reduced3); // { Renan: 29, Lais: 27, Luna: 1 }  - retorna um objeto com o nome como chave e a idade como valor
// O reduce é muito útil para transformar arrays em objetos, ou arrays em arrays, ou objetos em arrays, etc.

// ### EVERY - retorna true se todos os elementos retornaram true na função passada como argumento. Se não encontrar, retorna false
// ex.:
const arr9 = [1, 2, 3];
const every = arr9.every((item, index, array) => { // item é o elemento, index é o índice, array é o array original
  return item > 1; // retorna true se todos os elementos forem maiores que 1
});
console.log(every); // false




