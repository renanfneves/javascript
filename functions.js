// Function declaration (hoisted) - Function declaration é hoisted (pode ser chamada antes de ser declarada)
// Function expression (not hoisted) - Function expression não é hoisted (não pode ser chamada antes de ser declarada)
// Method notation - Method notation é uma forma de definir funções dentro de objetos

// Funções podem ser atribuídas a variáveis, retornadas por outras funções e passadas como argumentos

// Função anônima - Função sem nome, pode ser atribuída a uma variável ou passada como argumento. Ex.: const sum = function(a, b) { return a + b; }

// Toda função tem uma variável chamada this, que contem referência ao objeto responsável pela sua invocação


// diferença entre function declaration e function expression em relação a hoisting é que a function declaration é hoisted, enquanto a function expression não é.
// exemplo: 
// Function Declaration
console.log('Function Declaration', squareDeclaration()) // squareDeclaration
function squareDeclaration() {
  return 'squareDeclaration'
}
// Function Expression
try {
  console.log('Function Expression', squareExpression()) // TypeError: squareExpression is not a function
  const squareExpression = function() {
    return 'squareExpression'
  }
} catch (error) {
  console.log('Function Expression', error.message)  
}

const sum = function(a, b) {
  return a + b;
}

const subtract = function(a, b) {
  return a - b;
}

const calculate = function(fn) {
  return function(a, b) {
    return fn(a, b);
  }
}

function calculateArea() {
  return this.a * this.b;
}


const rectangle = {
  a: 10,
  b: 2,
  calculateArea,
}

console.log(rectangle.calculateArea());

const getterAndSetterObject = {
  set a(value) {
    if (value > 0) {
      this._a = value;
    } else {
      console.log('Invalid value for a');
    }
  },
  set b(value) {
    if (value > 0) {
      this._b = value;
    } else {
      console.log('Invalid value for b');
    }
  },
  get rectangle() {
    return this._a * this._b;
  },
}

getterAndSetterObject.a = 10;
getterAndSetterObject.b = 2;

// This refere-se a quem está a chamar a função. Ex.: getterAndSetterObject.a = 10 -> this refere-se a getterAndSetterObject

console.log('getter and setter', getterAndSetterObject.rectangle);

const getterAndSetterOldSchoolObject = {}
Object.defineProperty(getterAndSetterOldSchoolObject, 'a', {
  set(a) {
    if (a > 0) {
      this._a = a;
    } else {
      console.log('Invalid value for a');
    }
  },
});
Object.defineProperty(getterAndSetterOldSchoolObject, 'b', {
  set(b) {
    if (b > 0) {
      this._b = b;
    } else {
      console.log('Invalid value for b');
    }
  },
});
Object.defineProperty(getterAndSetterOldSchoolObject, 'rectangle', {
  get() {
    return this._a * this._b;
  }
});

getterAndSetterOldSchoolObject.a = 10;
getterAndSetterOldSchoolObject.b = 2;

console.log('getter and setter old school', getterAndSetterOldSchoolObject.rectangle);

// Call - Call é um método que permite chamar uma função e definir o this. A função é chamada com .call e o argumento passado é o this. Ex.: fn.call(this, arg1, arg2)
// Apply - Apply é um método que permite chamar uma função e definir o this. A função é chamada com .apply e o argumento passado é o this. Ex.: fn.apply(this, [arg1, arg2])
// A diferença entre call e apply é que call recebe os argumentos separados por vírgula e apply recebe os argumentos num array

const calculateAreaWithCallOrApply = function(fn) {
  return fn(Math.PI * Math.pow(this.radius, 2));
}
const circle = {
  radius: 10,
  calculateAreaWithCallOrApply,
}

console.log('call', calculateAreaWithCallOrApply.call(circle, Math.round));
console.log('apply', calculateAreaWithCallOrApply.apply(circle, [Math.ceil]));

// Bind - Encapsula this dentro de uma função. Ex.: fn.bind(this)

const calculateAreaWithBind = calculateAreaWithCallOrApply.bind(circle);
console.log('bind', calculateAreaWithBind(Math.round));
console.log('bind', calculateAreaWithBind(Math.ceil));

// A diferença entre call, apply e bind é que call e apply chamam a função imediatamente e bind encapsula a função

// Função fábrica - Função que retorna objetos ao ser invocada, deve iniciar com letra maiúscula e referenciar um ação. Ex.: function createPerson() {}

const personPrototype = {
  getAge() {
    return (new Date()).getFullYear() - this.year;
  }
}

const createPerson = function(name, city, year) {
  const person =  {
    name,
    city,
    year
  }
  Object.setPrototypeOf(person, personPrototype);
  return person;
}

const person1 = createPerson('Linus Torvalds', 'Helsinki', 1969);
const person2 = createPerson('Bill Gates', 'Seattle', 1955);
console.log('função fábrica - person 1', person1.getAge());
console.log('função fábrica - person 2', person2.getAge());
console.log('person 1 prototype', person1.__proto__);
console.log('person 2 prototype', person2.__proto__);
console.log('person 1 e person 2 herdam o mesmo prototype?', person1.__proto__ === person2.__proto__);

// Função construtora - Função que cria objetos, por convenção deve iniciar com letra maiúscula e referenciar um objeto. Deve ser chamada com new. Ex.: function Person() {}
// new cria um novo objeto vazio e associa as propriedades ao this da função construtora
// sempre associar as propriedades publicas ao this

const Person = function(name, city, year) {
  this.name = name;
  this.city = city;
  this.year = year;
}

// Toda função tem uma propriedade prototype, que é vinculada ao __proto__ do objeto criado com operador new
// Prototype é diferente de __proto__, prototype é uma propriedade de função e apenas funções construtoras utilizam, já __proto__ é a cadeia de protótipos do objeto de que ele herda.

Person.prototype.getAge = function() {
  return (new Date()).getFullYear() - this.year;
}

const person3 = new Person('Linus Torvalds', 'Helsinki', 1969);
const person4 = new Person('Bill Gates', 'Seattle', 1955);

// Algoritmo do new
const _new = function(fn, ...params) {
  // novo objeto vazio
  const obj = {};
  // associar o protótipo do objeto ao prototype da função construtora
  Object.setPrototypeOf(obj, fn.prototype);
  // chamar a função construtora com o this associado ao novo objeto
  fn.apply(obj, params);
  // retornar o novo objeto
  return obj;
}

const person5 = _new(Person, 'Linus Torvalds', 'Helsinki', 1969);
const person6 = _new(Person, 'Bill Gates', 'Seattle', 1955);
console.log('_new + função construtora - person 5', person5.getAge());
console.log('_new + função construtora - person 6', person6.getAge());

// typeof - Retorna o tipo de dado de uma variável. Ex.: typeof 1 -> number
// instanceof - Retorna true se o objeto é uma instância de um construtor. Ex.: obj instanceof Object -> true. O instanceof verifica a cadeia de protótipos do objeto. Ex.: obj instanceof Array -> true

const _instanceof = function(obj, fn) {
  // verifica se o protótipo do objeto é igual ao protótipo da função e retorna true
  if (obj === fn.prototype) { return true; }
  // verifica se o objeto é null e retorna false
  if (obj === null) { return false; }
  // chama a função recursivamente passando o protótipo do objeto
  // a cada chamada é passado sempre o protótipo do objeto
  return _instanceof(obj.__proto__, fn);
}
const date = new Date();
console.log('_instanceof', _instanceof(date, Date));
console.log('_instanceof', _instanceof(date, Object));
console.log('_instanceof', _instanceof(Object, Object));