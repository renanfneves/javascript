// Execution Context: é o ambiente onde o código é executado, sendo composto pelo variable object, scope chain e this.
// Execution Context Stack: é a pilha de execução de códigos, onde o último a entrar é o primeiro a sair.
// Composição do execution context stack: global execution context, function execution context, eval function execution context. 

// Escope chain: é possível acessar variáveis fora do escopo de uma função, mas não é possível acessar variáveis de dentro de uma função fora do escopo da função.
// As variáveis são acessadas de dentro para fora, ou seja, de dentro da função para fora da função.
// Sempre subindo na cadeia de protótipos até encontrar a variável desejada.

// ex.: 
const name = 'Renan';
function sayName() {
  console.log(name);
}
sayName();

// O escopo de name é global, por isso é possível acessar a variável name de dentro da função sayName.

// Se a variável name estivesse dentro da função sayName, não seria possível acessá-la fora da função sayName.

// ex.:
function sayName() {
  const name = 'Renan';
  console.log(name);
}
sayName();
console.log(name);
// O context de execução é isolado, por isso não é possível acessar a variável name de dentro da função sayName.

const obj1 = {
  p1: 1,
  getP1: function() {
    return this.p1;
  }
}
console.log(obj1.getP1());

const obj2 = {
  p1: 2,
  getP1: function() {
    const that = this;
    const fn1 = function() {
      return that.p1;
    }
    return fn1();
  }
}

console.log(obj2.getP1());

const obj3 = {
  p1: 2,
  getP1: function() {
    const fn1 = () => {
      return this.p1;
    }
    return fn1();
  }
}

console.log(obj3.getP1());

// O this é definido no momento da execução da função, e não no momento da declaração da função.
// O this é definido no momento da invocação da função.
// O this é definido pelo objeto que chama a função.
// O this é definido pelo contexto de execução da função.
// O this é definido pelo contexto de execução da função, e não pelo contexto de declaração da função.

// exemplo de erro com o this:
const obj4 = {
  p1: 2,
  outer: function() {
    const inner = function() {
      return this.p1;
    };
    return inner();
  }
}
console.log(obj4.outer()); // retorna undefined
// Neste caso o this é definido pelo contexto de execução da função inner, e não pelo contexto de execução da função outer.

