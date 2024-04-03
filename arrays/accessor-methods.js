// ## Accessor Methods - quando invocados retornam informações específicas sobre o array.
// Todos os métodos desta categoria não alteram o array original, retornando um novo array ou um valor específico.

// ### INDEXOF - retorna o primeiro índice em que um elemento pode ser encontrado no array. Se o elemento não estiver presente, retorna -1
// ex.:
const arr1 = [1, 2, 3];
const indexOfTwo = arr1.indexOf(2);
console.log(indexOfTwo); // 1 se o elemento estiver presente
const indexOfFour = arr1.indexOf(4);
console.log(indexOfFour); // -1 se o elemento não estiver presente

// ### LASTINDEXOF - retorna o último índice em que um elemento pode ser encontrado no array. Se o elemento não estiver presente, retorna -1
// ex.:
const arr2 = [1, 2, 3, 2];
const lastIndexOfTwo = arr2.lastIndexOf(2);
console.log(lastIndexOfTwo); // 3 se o elemento estiver presente
const lastIndexOfFour = arr2.lastIndexOf(4);
console.log(lastIndexOfFour); // -1 se o elemento não estiver presente

// ### INCLUDES - retorna true se o elemento passado como parâmetro existe dentro do array, e false se não existe.
// ex.:
const arr3 = [1, 2, 3];
const includesTwo = arr3.includes(2);
console.log(includesTwo); // true se o elemento estiver presente
const includesFour = arr3.includes(4);
console.log(includesFour); // false se o elemento não estiver presente

// ### CONCAT - retorna um novo array contendo o array original e os elementos passados como argumento
// ex.:
const arr4 = [1, 2];
const arr5 = arr4.concat(3, 4);
console.log(arr5); // [1, 2, 3, 4]
// é possível concatenar arrays
const arr6 = [1, 2];
const arr7 = arr6.concat([3, 4]); // não estamos inserindo os valores de um array ao outro, mas sim concatenando os arrays e retornando um novo array
console.log(arr7); // [1, 2, 3, 4]
// outra forma de concatenar arrays é criando um array vazio e concatenando os arrays desejados
// ex.:
const arr8 = [1, 2];
const arr9 = [3, 4];
const arr10 = [].concat(arr8, arr9); // cria um array vazio e concatena os arrays desejados
console.log(arr10); // [1, 2, 3, 4]
console.log(arr8); // [1, 2] - o array original não é alterado
console.log(arr9); // [3, 4] - o array original não é alterado

// ### SLICE - retorna um novo array contendo partes de um array original de acordo com a posição inicial e final passada como argumento.
// Retorna elementos a partir do índice inicial (x) até o índice final não incluso (n -1).
// ex.:
const arr11 = [1, 2, 3, 4, 5];
const sliced = arr11.slice(1, 3); // 1 é o índice inicial e 3 é o índice final (não incluso)
console.log(sliced); // [2, 3] 
// se não passar o segundo argumento, o slice retorna um novo array a partir do índice passado como argumento
const arr12 = [1, 2, 3, 4, 5];
const sliced2 = arr12.slice(2); // 2 é o índice inicial
console.log(sliced2); // [3, 4, 5]
// se passar índices negativos, o slice conta a partir do final do array
const arr13 = [1, 2, 3, 4, 5];
const sliced3 = arr13.slice(-2); // -2 é o índice inicial
console.log(sliced3); // [4, 5]
// é possível passar índices negativos para o segundo argumento também. O slice conta a partir do final do array
const arr14 = [1, 2, 3, 4, 5];
const sliced4 = arr14.slice(1, -1); // 1 é o índice inicial e -1 é o índice final (não incluso)
console.log(sliced4); // [2, 3, 4] - explicando em outras palavras o slice pega os elementos do índice 1 até o penúltimo elemento

// ### JOIN - convert um array em uma string, concatenando todos os elementos do array com um separador.
// pode-se considerar o join como o inverso do split
// ex.:
const arr15 = [1, 2, 3];
const joined = arr15.join(); // sem argumento o separador padrão é a vírgula
console.log(joined); // 1,2,3
const joined2 = arr15.join(''); // sem separador
console.log(joined2); // 123
const joined3 = arr15.join('-'); // separador é o hífen
console.log(joined3); // 1-2-3





