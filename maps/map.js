// Map é uma estrutura de dados que armazena pares chave/valor. Qualquer valor (tanto objetos quanto valores primitivos) podem ser usados como chave ou valor.
// A diferença entre um objeto e um Map é que um objeto aceita apenas strings e símbolos como chaves, enquanto um Map pode ter chaves de qualquer tipo.
// Map é uma estrutura de dados iterável, o que significa que podemos iterar sobre ele usando métodos como forEach, for...of, etc.
// Map não possui um prototype, o que significa que não possui métodos como hasOwnProperty, toString, etc.
// Map tem referências forte para as chaves, o que significa que as chaves não são removidas da memória até que o Map seja removido da memória.
// Ao contrário do objeto literal os valores passados como chave no Map não são convertidos para string.
// ex.:
const map = new Map();
map.set(1, 'a');
map.set('1', 'b');
map.set(true, 'c');
map.set({}, 'd');
map.set([], 'e');
console.log(map); // Map { 1 => 'a', '1' => 'b', true => 'c', {} => 'd', [] => 'e' }


// podemos criar um Map passando um array de arrays, onde cada array interno contém a chave e o valor.
// ex.:
const timeUnits = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
console.log(timeUnits); // Map { 'second' => 1, 'minute' => 60, 'hour' => 3600 }

// ou podemos criar um Map vazio
// ex.:
const timeUnits2 = new Map();
console.log(timeUnits2); // Map { 'second' => 1, 'minute' => 60, 'hour' => 3600 }

// podemos converter um Map em um array de arrays usando o método Array.from
// ex.:
const timeUnits3 = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
console.log(Array.from(timeUnits3)); // [ [ 'second', 1 ], [ 'minute', 60 ], [ 'hour', 3600 ] ]

// ## methods ##

// ### SIZE

// o método size retorna o número de elementos no Map, similar ao length de um array
// ex.:
const timeUnits4 = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
console.log(timeUnits4.size); // 3

// ### SET
// o método set adiciona ou atualiza um elemento no Map
// ex.:
const timeUnits5 = new Map();
timeUnits5.set('second', 1);
timeUnits5.set('minute', 60);
timeUnits5.set('hour', 3600);
console.log(timeUnits5); // Map { 'second' => 1, 'minute' => 60, 'hour' => 3600 }

// ### FOREACH
// Itera sobre o map dando acesso a chave e valor
// O foreach tem uma peculiaridade, ele passa o valor antes da chave
// ex.:
const timeUnits6 = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
timeUnits6.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
// isso acontece porque o forEach é baseado no método forEach de arrays, que recebe o valor antes do índice
// ex.:
const arr = ['a', 'b', 'c'];
arr.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});

// ### HAS
// o método has verifica se uma chave existe no Map, retornando true se existir ou false se não existir
// ex.:
const timeUnits7 = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
console.log(timeUnits7.has('second')); // true
console.log(timeUnits7.has('day')); // false

// ### GET
// o método get retorna o valor associado a uma chave no Map, ou undefined se a chave não existir
// ex.:
const timeUnits8 = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
console.log(timeUnits8.get('second')); // 1
console.log(timeUnits8.get('day')); // undefined

// ### DELETE
// o método delete remove um par de chave/valor do Map
// ex.:
const timeUnits9 = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
console.log(timeUnits9.get('second')); // 1
timeUnits9.delete('second'); // o método delete retorna true se a chave existir e false se não existir
console.log(timeUnits9); // Map { 'minute' => 60, 'hour' => 3600 }
console.log(timeUnits9.get('second')); // undefined

// ### CLEAR
// o método clear remove todos os elementos do Map
// ex.:
const timeUnits10 = new Map([['second', 1], ['minute', 60], ['hour', 3600]]);
console.log(timeUnits10); // Map { 'second' => 1, 'minute' => 60, 'hour' => 3600 }
timeUnits10.clear();
console.log(timeUnits10); // Map {}
