// # SET
// set é um objeto que armazena VALORES ÚNICOS de qualquer tipo, seja valores primitivos ou referências a objetos.

const charsets = new Set(['ASCII', 'ISO-8859-1', 'UTF-8']);
console.log(charsets); // Set { 'ASCII', 'ISO-8859-1', 'UTF-8' }

// podemos converter um Set em um array 
// ex.:
const charsets2 = new Set(['ASCII', 'ISO-8859-1', 'UTF-8']);
console.log(Array.from(charsets2)); // [ 'ASCII', 'ISO-8859-1', 'UTF-8' ]

// ## methods ##

// ### SIZE
// o método size retorna o número de elementos no Set, similar ao length de um array
// ex.:
const charsets3 = new Set(['ASCII', 'ISO-8859-1', 'UTF-8']);
console.log(charsets3.size); // 3

// ### ADD
// o método add adiciona um novo elemento ao Set
// ex.:
const charsets4 = new Set();
charsets4.add('ASCII');
charsets4.add('ISO-8859-1');
charsets4.add('UTF-8');
console.log(charsets4); // Set { 'ASCII', 'ISO-8859-1', 'UTF-8' }

// ### FOREACH
// Itera sobre o set dando acesso ao valor
// ex.:
const charsets5 = new Set(['ASCII', 'ISO-8859-1', 'UTF-8']);
charsets5.forEach((value) => {
  console.log(value);
});

// ### HAS
// o método has retorna true se o valor existir no Set e false se não existir
// ex.:
const charsets6 = new Set(['ASCII', 'ISO-8859-1', 'UTF-8']);
console.log(charsets6.has('ASCII')); // true
console.log(charsets6.has('UTF-16')); // false

// ### DELETE
// o método delete remove um elemento do Set, retornando true se o elemento existir e false se não existir
// ex.:
const charsets7 = new Set(['ASCII', 'ISO-8859-1', 'UTF-8']);
console.log(charsets7.has('ASCII')); // true
charsets7.delete('ASCII');
console.log(charsets7.has('ASCII')); // false
console.log(charsets7); // Set { 'ISO-8859-1', 'UTF-8' }

// ### CLEAR
// o método clear remove todos os elementos do Set
// ex.:
const charsets8 = new Set(['ASCII', 'ISO-8859-1', 'UTF-8']);
console.log(charsets8.size); // 3
charsets8.clear();
console.log(charsets8.size); // 0
console.log(charsets8); // Set {}

// ### Qual é a diferença entre um Set e um Array?
// O set não permite elementos duplicados, enquanto o array permite.
// ex.:
const arr = ['a', 'b', 'a', 'c'];
console.log(arr); // [ 'a', 'b', 'a', 'c' ]
console.log(arr.length); // 4
const set = new Set(['a', 'b', 'a', 'c']);
console.log(set); // Set { 'a', 'b', 'c' }
console.log(set.size); // 3
// podemos usar o set para eliminar elementos duplicados de um array
// ex.:
const arr2 = ['a', 'b', 'a', 'c'];
const set2 = new Set(arr2);
console.log(Array.from(set2)); // [ 'a', 'b', 'c' ]
// podemos usar o spread operator para fazer a mesma coisa
// ex.:
const arr3 = ['a', 'b', 'a', 'c'];
const set3 = new Set([...arr3]);
console.log(Array.from(set3)); // [ 'a', 'b', 'c' ]
// caso contrário seria necessário fazer um loop para adicionar os elementos do array para remover os elementos duplicados
// ex.:
let array = [10, 10, 10]
console.log(array); // [ 10, 10, 10 ]
const obj = {};
array.forEach(value => {
  obj[value] = undefined;
});
console.log(obj); // { '10': undefined }
array = Object.keys(obj);
console.log(array); // [ '10' ]

// ### Para que serve um Set?

// Para armazenar valores únicos de qualquer tipo, seja valores primitivos ou referências a objetos.

