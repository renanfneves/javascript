// # CLASSES
// As Classes são um tipo especial de função que atuam como um template para criação de objetos.

// Class Declaration
class Square {}
console.log(Square) // [Function: Square]

// Class Expression
const square = class {}
console.log(typeof square) // function

// Class instance creation
const squareInstance = new Square();

// Classes não sofrem hoisting independente da forma como são declaradas.
// Ou seja, não podem ser chamadas antes de serem declaradas.

// Class declaration
try {
  const squareDeclaration = new Square(); // Cannot access 'Square' before initialization
  class Square {}
} catch (error) {
  console.log(error.message) // ReferenceError: Cannot access 'Square' before initialization
}

// Class expression
try {
  const squareExpression = new Square(); // Cannot access 'Square' before initialization
  const Square = class {}
} catch (error) {
  console.log(error.message) // TypeError: Square is not a constructor
}

// Classes são formadas por 3 tipos de membros: constructor, prototype methods e statics methods.

// ## Constructor
// É chamado no momento da instanciação da classe e serve para inicializar um determinado objeto.
// Se não for declarado, um constructor vazio é adicionado automaticamente.

class Square {
  constructor(side) { // todos os parâmetros passados para a classe são passados para o constructor
    this.side = side;
  }
}
const squareConstructor = new Square(4);
console.log(squareConstructor) // Square { side: 4 }

// ## Prototype Methods
// São métodos que dependem de uma instância para serem invocados.
// São métodos que pertencem ao prototype deste objeto que está sendo instanciado.

class Square {
  constructor(side) {
    this.side = side;
  }
  calculateArea() {
    return Math.pow(this.side, 2);
  }
  toString() {
    return `Side ${this.side} and Area ${this.calculateArea()}`;
  }
}
const squarePrototype = new Square(4);
console.log(squarePrototype) // Square { side: 4 } - toString não é exibido pois pertence ao prototype
console.log(squarePrototype.toString()) // Side 4
console.log(squarePrototype.calculateArea()) // 16
// Ambos dependem de uma instancia para serem invocados

// ## Static Methods
// Não dependem de uma instância para serem invocados.
// São métodos que pertencem a classe, não ao prototype.

class Square {
  constructor(side) {
    this.side = side;
  }
  static fromArea(area) {
    return new Square(Math.sqrt(area));
  }
}
const squareStatic = Square.fromArea(16); // não é necessário instanciar a classe

// Classes funcionam de forma similar a funções construtoras, mas com algumas diferenças.

function Square(side) {
  this.side = side;
}
Square.prototype.calculateArea = function() {
  return Math.pow(this.side, 2);
}
Square.prototype.toString = function() {
  return `Side ${this.side} and Area ${this.calculateArea()}`;
}
Square.fromArea = function(area) {
  return new Square(Math.sqrt(area));
}

// Classes são syntactic sugar para funções construtoras. Uma implementação que está num nível acima de funções construtoras.

// ## Hierarquia de Classes
// Classes podem ser extendidas através da palavra chave extends.
// A classe filha herda todos os membros da classe pai.

class Shape {
  constructor(radius) {
    this.radius = radius;
  }
  toString() {
    return `Area ${this.calculateArea()}`; // método abstrato que será implementado nas subclasses. Identificamos um método abstrato quando ele é declarado sem corpo.
  }
}

class Circle extends Shape {
  // Ao declarar um constructor na subclass é necessário invocar o constructor da superclasse
  // por meio do super() antes de utilizar this.
  constructor(radius) {
    super(radius);
    this.radius = radius;
  }
  calculateArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
  toString() {
    return `Radius ${this.radius} and ${super.calculateArea()}`;
  }
  static fromArea(area) {
    return new Circle(Math.sqrt(area / Math.PI));
  }
}
const circle = Circle.fromArea(314.1592653589793);
