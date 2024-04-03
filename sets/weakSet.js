// # WEAKSET
// É um objeto, similar ao Set, que permite apenas valores do tipo Object e mantém as referências de forma fraca, sendo volátil e não iterável.

const ws1 = new WeakSet();
console.log(ws1); // WeakSet {}

// ## METHODS ##
// o WeakSet possui apenas 3 métodos: add, has e delete
// note que não há métodos para iterar sobre um WeakSet, como o forEach de um Set
// O foreach itera sobre os elementos que existem dentro do Set, no weakSet ele não garante que o elemento ainda exista
// Não é garantido que um elemento estará presente em um WeakSet.
// Uma vez que o valor esteja desreferenciado, atribui null o WeakSet não garante mais a permanência deste elemento mapa.
// o valor de um WeakSet deve ser um objeto
// caso o valor seja um valor primitivo, o WeakSet lançará um erro

// ### ADD
const ws2 = new WeakSet();
const obj1 = {};
const obj2 = {};
ws2.add(obj1);
ws2.add(obj2);
console.log(ws2); // WeakSet { [items unknown] }

// ### HAS
// retorna true se o valor existir no WeakSet e false se não existir 
// ex.:
const ws3 = new WeakSet();
const obj3 = {};
ws3.add(obj3);
console.log(ws3.has(obj3)); // true
console.log(ws3.has({})); // false
// por mais que o objeto seja igual, ele não é a mesma referência

// ### DELETE
// remove um valor do WeakSet, retornando true se o valor existir e false se não existir
// ex.:
const ws4 = new WeakSet();
const obj4 = {};
ws4.add(obj4);
console.log(ws4.has(obj4)); // true
ws4.delete(obj4);
console.log(ws4.has(obj4)); // false
console.log(ws4); // WeakSet { [items unknown] }

// ### Para que serve um WeakSet?
// Serve para criamos coleções de elementos sem nos preocuparmos com memory leaks
// no momento que os elementos são desreferenciados, eles se tornam elegíveis para serem coletados pelo garbage collector
// e não precisaremos nos proecupar em remover manualmente os elementos do WeakSet

const circles = new WeakSet();
function Circle(radius) {
  circles.add(this);
  this.radius = radius;
}
Circle.prototype.calculateArea = function() {
  if(!circles.has(this)) throw 'Invalid object'; // aqui estamos verificando se o objeto é uma instância de Circle
  return Math.PI * Math.pow(this.radius, 2);
}
const circle1 = new Circle(10);
const circle2 = {
  radius: 5,
}
console.log(circle1.calculateArea()); // 314.1592653589793
console.log(circle1.calculateArea.call(circle2)); // Invalid object
// quero impedir que o método calculateArea seja chamado em um objeto que não seja uma instância de Circle
circle1 = null; // o objeto circle1 foi desreferenciado, ele não existe mais no WeakSet circles. O garbage collector pode coletar o objeto circle1


