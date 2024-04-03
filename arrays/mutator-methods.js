// # ARRAYS

// Objeto normal em javascript que oferece métodos para acessar e manipular suas propriedades.
// typeof Object
// instanceOf Array

// Na declaração de um array com indexes espaçados.
// ex.: 
const arr1 = [];
arr1[0] = 1;
arr1[10] = 2;
arr1[20] = 3;
// este array tem 21 posições, sendo 3 posições preenchidas e 18 posições vazias.

console.log(arr1); // [ 1, <9 empty items>, 2, <9 empty items>, 3 ]
console.log(arr1.length); // 21
console.log(arr1[1]); // undefined

// ## MUTATOR METHODS - alteram o array original quando invocadas

// ### PUSH - adiciona um ou mais elementos no final do array e acrescenta o length do array
// ex.:
const arr2 = [1, 2];
arr2.push(3);
console.log(arr2); // [1, 2, 3]
console.log(arr2.length); // 3

// ### POP - remove o último elemento do array e diminui o length do array
// ex.:
const arr3 = [1, 2, 3];
arr3.pop();
console.log(arr3); // [1, 2]
console.log(arr3.length); // 2

// ### SHIFT - remove o primeiro elemento do array e diminui o length do array
// ex.:
const arr4 = [1, 2, 3];
arr4.shift();
console.log(arr4); // [2, 3]
console.log(arr4.length); // 2

// ### UNSHIFT - adiciona um ou mais elementos no início do array e acrescenta o length do array
// ex.:
const arr5 = [1, 2];
arr5.unshift(3);
console.log(arr5); // [3, 1, 2]
console.log(arr5.length); // 3

// ### SPLICE - adiciona ou remove elementos do array
// ex.:
const arr6 = [1, 2, 3];
// para adicionar um elemento
arr6.splice(1, 0, 4); // 1 é o índice, 0 é a quantidade de elementos a serem removidos, 4 é o elemento a ser adicionado
console.log(arr6); // [1, 4, 2, 3]
console.log(arr6.length); // 4
// é possível adicionar mais de um elemento
arr6.splice(1, 0, 5, 6); // 1 é o índice, 0 é a quantidade de elementos a serem removidos, 5 e 6 são os elementos a serem adicionados
console.log(arr6); // [1, 5, 6, 4, 2, 3]
console.log(arr6.length); // 6

// para remover um elemento
const removed = arr6.splice(1, 1); // 1 é o índice, 1 é a quantidade de elementos a serem removidos
console.log(arr6); // [1, 2, 3]
console.log(removed); // [4] - retorna um array com os elementos removidos

// é possível remover mais de um elemento
const removed2 = arr6.splice(1, 2); // 1 é o índice, 2 é a quantidade de elementos a serem removidos
console.log(arr6); // [1, 3]
console.log(removed2); // [2, 3] - retorna um array com os elementos removidos

// é possível adicionar e remover elementos ao mesmo tempo
const removed3 = arr6.splice(1, 1, 2); // 1 é o índice, 1 é a quantidade de elementos a serem removidos, 2 é o elemento a ser adicionado
console.log(arr6); // [1, 2]
console.log(removed3); // [3] - retorna um array com os elementos removidos

// ### SORT - ordena os elementos do array

// Se o retorno do sort for -1 (negativo) ou 0 os elementos não são trocados de posição
// Se o retorno do sort for 1 (positivo) os elementos são trocados de posição

// RETORNO POSITIVO SEMPRA TROCA OS ELEMENTOS DE POSIÇÃO
// RETORNO NEGATIVO MANTÉM OS ELEMENTOS NA MESMA POSIÇÃO

// ex.:
const arr7 = [2, 1, 3];

// ordena em ordem crescente porque se o elemento da esquerda for menor que o elemento da direita o retorno é negativo (-1)
// e os elementos não são trocados de posição.
//Caso contrário os elementos são trocados de posição.
arr7.sort((a, b) => a - b); 
console.log(arr7); // [1, 2, 3]

// ordena em ordem decrescente porque se o elemento da esquerda for maior que o elemento da direita o retorno é positivo (1)
// e os elementos são trocados de posição.
//Caso contrário os elementos não são trocados de posição.
arr7.sort((a, b) => b - a);

// ordenação de strings
const arr8 = ['b', 'a', 'c'];
arr8.sort(); // ordena em ordem alfabética, porém a ordenação é case-sensitive e a ordem é de acordo com a tabela ASCII
console.log(arr8); // ['a', 'b', 'c']

// para ordenar utilizando operador ternário
arr8.sort((a, b) => a < b ? -1 : 1); // ordena em ordem alfabética. Se a for menor que b retorna -1 (mantém posição), caso contrário retorna 1 (troca posição)
console.log(arr8); // ['a', 'b', 'c']
arr8.sort((a, b) => a > b ? -1 : 1); // ordena em ordem alfabética reversa. Se a for maior que b retorna -1 (troca posição), caso contrário retorna 1 (mantém posição)
console.log(arr8); // ['c', 'b', 'a']

// para ordenar em ordem alfabética sem ser case-sensitive é necessário passar uma função de comparação
arr8.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })); // o localeCompare compara strings e retorna -1, 0 ou 1

// ### REVERSE - inverte a ordem dos elementos do array
// ex.:
const arr9 = [1, 2, 3];
arr9.reverse();
console.log(arr9); // [3, 2, 1]

// ### FILL - preenche o array com um valor
// ex.:
const arr10 = [1, 2, 3];
arr10.fill(0); // preenche o array com 0
console.log(arr10); // [0, 0, 0]

// é possível passar um segundo argumento para indicar a partir de qual posição do array deve ser preenchido
const arr11 = [1, 2, 3];
arr11.fill(0, 1); // preenche o array com 0 a partir da posição 1
console.log(arr11); // [1, 0, 0]

// é possível passar um terceiro argumento para indicar até qual posição do array deve ser preenchido
const arr12 = [1, 2, 3];
arr12.fill(0, 1, 2); // preenche o array com 0 da posição 1 até a posição 2
console.log(arr12); // [1, 0, 3]

// ## ACESSOR METHODS - não alteram o array original quando invocadas



