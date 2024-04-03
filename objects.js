// Short hand notation
const name = 'Renan';
const age = 34;

const person = {
  name,
  age,
}

// Formas de criar objetos em JavaScript - 
// Object literal. ex.: const obj = {}
// constructor functions. ex.: function Person() {}
// factory functions. ex.: function createPerson() {}
// Object.create. ex.: Object.create({}) o parâmetro é o protótipo do objeto, para criar e definir propriedades do objeto ao mesmo tempo é só passar um segundo parâmetro com as propriedades do objeto a ser criado . ex.: Object.create({}, { prop: { value: 1 } }) sendo o primeiro parâmetro o protótipo do objeto e o segundo parâmetro as propriedades do objeto a ser criado
// shorthand notation. ex.: const name = 'Renan'; const age = 34; const person = { name, age } 
// objetos aceitam apenas strings e símbolos como chaves.
// qualquer valor passado como chave que não for string ou símbolo será convertido para string.
// ex.:
const obj = {
  1: 'a',
  2: 'b',
  3: 'c',
}
console.log(obj); // { '1': 'a', '2': 'b', '3': 'c' }
// para usar um symbol como chave é necessário utilizar a notação de colchetes
// ex.:
const objSymbol = {
  [Symbol('a')]: 1,
  [Symbol('b')]: 2,
}
console.log(objSymbol); // { [Symbol(a)]: 1, [Symbol(b)]: 2 }
// objetos literais não possuem prototype, por isso não é possível acessar o prototype de um objeto literal.
// ao invés de acessar o prototype de um objeto literal é possível acessar o __proto__ do objeto literal
// objetos literais não criam um novo escopo, por isso não é possível acessar variáveis de fora do objeto literal de dentro do objeto literal.
// para exemplificar:
const a = 1; // variável no escopo global
const objEscopo = {
  a: 2, // variável no escopo do objeto literal
  getA() {
    return a; // a variável a é acessada no escopo global e não no escopo do objeto literal
  }
}
console.log(objEscopo.getA()); // 1 - a variável a é acessada no escopo global e não no escopo do objeto literal
// ao tentarmos acessar uma variável de fora do escopo do objeto literal de dentro do objeto literal não conseguiríamos acessar a variável a, pois objetos literais não criam um novo escopo.
// ex.:
const objEscopo2 = {
  a: 2,
  getA() {
    return a;
  }
}
console.log(objEscopo2.getA()); // ReferenceError: a is not defined
// a diferença entre os dois exemplos é que get irá acessar o escope de execução.
// em ambas o escopo de execução é o global, por isso a variável a é acessada no escopo global.
// por isso no segundo exemplo é lançado um erro, pois a variável a não foi definida no escopo global.
// quando dizemos escopo global estamos nos referindo ao escopo de execução do código.
// podendo ser o escopo de execução de um arquivo, de uma função, de um bloco de código, etc.


// Object API

// Object.assign
const objAPI = { a: 1 };
const copy = Object.assign({}, objAPI);
console.log('object.assign', copy);

// Object.keys
const keys = Object.keys(objAPI);
console.log('object.keys', keys);

// Object.values
const values = Object.values(objAPI);
console.log('object.values', values);

// Object.entries
const entries = Object.entries(objAPI);
console.log('object.entries', entries);

// Object.freeze
Object.freeze(objAPI);
objAPI.a = 2;
console.log('object.freeze', objAPI);

// Object.seal
Object.seal(objAPI);
objAPI.a = 2;
console.log('object.seal', objAPI);

// Object.create
const objCreate = Object.create({ a: 1 });
console.log('object.create', objCreate);

// Object.defineProperty
Object.defineProperty(objCreate, 'b', {
  value: 2,
  writable: false,
});
objCreate.b = 3;
console.log('object.defineProperty', objCreate);

// Object.defineProperties
Object.defineProperties(objCreate, {
  c: {
    value: 3,
    writable: false,
  },
  d: {
    value: 4,
    writable: false,
  },
});
objCreate.c = 4;
console.log('object.defineProperties', objCreate);

// Object.getOwnPropertyDescriptor
const propertyDescriptor = Object.getOwnPropertyDescriptor(objCreate, 'c');
console.log('object.getOwnPropertyDescriptor', propertyDescriptor);

// Object.getOwnPropertyDescriptors
const propertyDescriptors = Object.getOwnPropertyDescriptors(objCreate);
console.log('object.getOwnPropertyDescriptors', propertyDescriptors);

// Object.is
const objIs = { a: 1 };
const objIsCopy = { a: 1 };
console.log('object.is', Object.is(objIs, objIsCopy));

// Object.isExtensible
console.log('object.isExtensible', Object.isExtensible(objIs));

// Object.preventExtensions
Object.preventExtensions(objIs);
objIs.b = 2;
console.log('object.preventExtensions', objIs);

// Object.isSealed
console.log('object.isSealed', Object.isSealed(objIs));

// Object.isFrozen
console.log('object.isFrozen', Object.isFrozen(objIs));

// Object.fromEntries
const entriesFromEntries = Object.entries(objAPI);
const objFromEntries = Object.fromEntries(entriesFromEntries);
console.log('object.fromEntries', objFromEntries);

// Object.setPrototypeOf
const proto = { a: 1 };
const objSetPrototypeOf = Object.setPrototypeOf({}, proto);
console.log('object.setPrototypeOf', objSetPrototypeOf);

// Object.getPrototypeOf
const protoGetPrototypeOf = Object.getPrototypeOf(objSetPrototypeOf);
console.log('object.getPrototypeOf', protoGetPrototypeOf);

// Object.getOwnPropertyNames
const propertyNames = Object.getOwnPropertyNames(objAPI);
console.log('object.getOwnPropertyNames', propertyNames);

// Object.getOwnPropertySymbols
const symbol = Symbol('a');
const objSymbols = { [symbol]: 1 };
const symbols = Object.getOwnPropertySymbols(objSymbols);
console.log('object.getOwnPropertySymbols', symbols);

// Object.isPrototypeOf
const objIsPrototypeOf = {};
console.log('object.isPrototypeOf', objIsPrototypeOf.isPrototypeOf(objAPI));

// Object.toString
console.log('object.toString', objAPI.toString());

// Object.toLocaleString
console.log('object.toLocaleString', objAPI.toLocaleString());

// Object.valueOf
console.log('object.valueOf', objAPI.valueOf());

// Object.hasOwnProperty
console.log('object.hasOwnProperty', objAPI.hasOwnProperty('a'));

// Object.propertyIsEnumerable
console.log('object.propertyIsEnumerable', objAPI.propertyIsEnumerable('a'));


// Objetos literais não criam um novo escopo, por isso não é possível acessar variáveis de fora do objeto literal de dentro do objeto literal.

// objetos literais não possuem prototype, por isso não é possível acessar o prototype de um objeto literal.
// ex.: 
const objLiteral = {
  a: 1,
  b: 2,
}
console.log(objLiteral.prototype);
const obj3 = {}
console.log(obj3.prototype);

// para acessar o prototype de um objeto literal é necessário utilizar o Object.create
// entretanto objetos literais possuem __proto__ que é uma referência ao prototype do objeto literal
// ex.:
const obj4 = {
}
console.log(obj4.__proto__);

// podemos atribuir um novo valor ao __proto__ de um objeto literal
// ex.:
const obj5 = {
}
obj5.__proto__ = { a: 1 };

// ou

const obj6 = Object.create({ a: 1 });

// ou

const obj7 = {}
Object.setPrototypeOf(obj7, { a: 1 });

// ou

const obj8 = {
  __proto__: { a: 1 }
}
