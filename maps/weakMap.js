// # WeakMap
// WeakMap é um objeto, similar ao Map, que permite apenas chaves do tipo Object e mantém as referências de chaves fracas, sendo volátil e não iterável.

const wm1 = new WeakMap();
console.log(wm1); // WeakMap {}

// ## METHODS ##

// o WeakMap possui apenas 4 métodos: get, set, has e delete
// note que não há métodos para iterar sobre um WeakMap, como o forEach de um Map
// Não é garantido que um elemento estará presente em um WeakMap.
// Uma vez que a chave esteja desreferenciada, atribui null o WeakMap não garante mais a permanência deste elemento mapa.
// a chave de um WeakMap deve ser um objeto
// caso a chave seja um valor primitivo, o WeakMap lançará um erro

// ### SET
const wm2 = new WeakMap();
const obj1 = {};
const obj2 = {};
wm2.set(obj1, 'a');
wm2.set(obj2, 'b');
console.log(wm2); // WeakMap { <items unknown> }

// ### HAS
// retorna true se a chave existir no WeakMap
// ex.:
const wm3 = new WeakMap();
const obj3 = {};
wm3.set(obj3, 'a');
console.log(wm3.has(obj3)); // true
console.log(wm3.has({})); // false
// por mais que o objeto seja igual, ele não é a mesma referência

// ### GET
// retorna o valor associado a uma chave no WeakMap, ou undefined se a chave não existir
// ex.:
const wm4 = new WeakMap();
const obj4 = {};
wm4.set(obj4, 'a'); // a chave é obj4
console.log(wm4.get(obj4)); // 'a'
console.log(wm4.get({})); // undefined

// ### DELETE
// remove um par de chave/valor do WeakMap
// ex.:
const wm5 = new WeakMap();
const obj5 = {};
wm5.set(obj5, 'a');
console.log(wm5.get(obj5)); // 'a'
wm5.delete(obj5); // o método delete retorna true se a chave existir e false se não existir
console.log(wm5.get(obj5)); // undefined
console.log(wm5); // WeakMap { <items unknown> }

// quando perdemos a referência para um objeto, o WeakMap remove a chave associada a este objeto

// ### Para que serve um WeakMap?

// Implementar uma coleção com referências fracas para que você não precise se preocupar com a limpeza de memória.
// Sem que você se preocupe com vazamento de memória.
// ex.:
const wm = new WeakMap();
const rectangle1 = {
  x: 10,
  y: 2,
}
const rectangle2 = {
  x: 5,
  y: 3,
}
function calculateArea(rectangle) {
  if(wm.has(rectangle)) {
    console.log('using cache');
    return wm.get(rectangle);
  }
  const area = rectangle.x * rectangle.y;
  area.set(rectangle, area);
  return area;
}
console.log(calculateArea(rectangle1)); // 20
console.log(calculateArea(rectangle2)); // 15
console.log(calculateArea(rectangle1)); // 20 - using cache
console.log(calculateArea(rectangle2)); // 15 - using cache
rectangle1 = null; // perdemos a referência para rectangle1 - ao perder a referência para rectangle1, o garbage collector do JavaScript vai limpar a memória que não está sendo utilizada
rectangle2 = null; // perdemos a referência para rectangle2 - ao perder a referência para rectangle2, o garbage collector do JavaScript vai limpar a memória que não está sendo utilizada
// ou mesmo a função poderia acabar, o escopo da função poderia acabar.
// o garbage collector do JavaScript vai limpar a memória que não está sendo utilizada
// para evitar que a aplicação acabe com a memória do sistema operacional e seja interrompida.
// caso usassemos um Map, nós teríamos que nos preocupar em limpar a memória manualmente.

