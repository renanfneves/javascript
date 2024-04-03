// Closure é o escopo criado quando uma função é declarada
// Característica do closure: mantém o escope chain de forma estática. O closure é criado no momento da declaração da função.
// Closure é um escopo que envolve uma função, e mantém o escopo de onde a função foi criada.
// Closure lembra do escopo onde a função foi criada.

// Não é possível acessar uma variável de dentro de uma função de dentro de outra função, a não ser que a variável seja passada como argumento para a função interna.

const v1 = 10;
const outsideAttempt = function(){
    const v1 = 100;
    console.log('inside outsideAttempt', v1);
    const fn2 = function(){
        const v1 = 1000;
        console.log('inside fn2', v1);
    }
    fn2();
}
outsideAttempt();
console.log('v1 global execution context', v1);

// Closure é o escopo criado quando uma função é declarada
const v2 = 10;
// Neste momento é criado o closure de fn1
function fn1(){
    // Neste momento é criado o closure de fn2
    console.log('creation escope', v2);
}
// Neste momento é criado o closure de fn2
function fn2(fn1){
  // Neste v2 é 100
    const v2 = 100;
    // Aui é chamado o closure de fn1
    fn1();
}
// Na invocação de fn2 é chamado o closure de fn1 e o valor de v2 é 10, porque fn1 tem o valor de v2 no momento da declaração
fn2(fn1);

// Quando o escopo é comum a duas funções, o valor da variável é compartilhado entre as funções

// Neste caso o valor de v3 é compartilhado entre as funções increment e decrement
const factoryFunction3 = function(){
    let v3 = 10;
    return {
        increment: function(){
            console.log(++v3);
        },
        decrement: function(){
            console.log(--v3);
        }
    }
}

// Ao criar o objeto v3 é criado no momento da declaração da função factoryFunction3 e compartilhado entre as funções increment e decrement em memória e não em valor
const obj = factoryFunction3();
obj.increment();
obj.decrement();


// Neste caso o valor de v4 é compartilhado entre as funções increment e decrement
const obj2 = {}
for(var i = 0; i < 3; i++){
    obj2[i] = function(){
        // Quando for chamado o valor de i é 3, porque o valor de i é 3 no momento da invocação da função
        console.log(i);
    }
}
obj2[0]();
obj2[1]();
obj2[2]();

// Para resolver o problema acima é necessário criar um closure para cada função
const obj3 = {}
for(var i = 0; i < 3; i++){
    obj3[i] = (function(i){
        // Neste caso o valor de i é compartilhado entre as funções increment e decrement
        return function(){
            console.log(i);
        }
    })(i);
}
obj3[0]();
obj3[1]();
obj3[2]();

// Outra forma de resolver o problema acima é utilizando o bind, que cria um closure para cada função
const obj4 = {}
for(var i = 0; i < 3; i++){
    obj4[i] = function(){
        console.log(this.x);
    }.bind({ x: i });
}

obj4[0]();
obj4[1]();
obj4[2]();

// Outra forma de resolver o problema acima é utilizando o let, que cria um closure para cada função
const obj5 = {}
for(let i = 0; i < 3; i++){
    obj5[i] = function(){
        console.log(i);
    }
}
obj5[0]();
obj5[1]();
obj5[2]();

// a diferença entre var e let é que var é hoisted e let não é hoisted
// var é hoisted e let não é hoisted

// A diferença entre closure e função é que closure é o escopo criado quando uma função é declarada e função é um bloco de código que pode ser chamado por nome
// exemplo de função:
function fn3(){
    console.log('fn3');
}
fn3();
// exemplo de closure:
const closure = function(){
    console.log('closure');
}
closure();


function closureCache() {
  const cache = {}
  const pass = '123456'
  return function(index) {
    if(cache[index]) {
      console.log('Cache hit', cache[index])
      return cache[index]
    }
    cache[index] = pass[index]
    console.log('not in cache', cache[index])
  } 
}

const cache = closureCache()
cache(0)
cache(0)
cache(1)
cache(1)
cache(2)


// podemos afirmar que a cleaning function é um closure, porque ela tem acesso ao escopo da função cache
function cleaningFunction() {
  // currentRender é uma variável que pertence ao escopo da função cache
  // função cache é um closure, porque ela tem acesso ao escopo da função cleaningFunction
  let currentRender = true // cria uma variável no escopo da função cache
  return function() { // retorna uma função que tem acesso ao escopo da função cache
    console.log('Cleaning function', currentRender)
    return currentRender = false // altera o valor da variável currentRender
  }
}

// exemplo clean function em um useEffect do React
 useEffect(() => { // useEffect é uma função que recebe uma função como argumento
    // A variável isMounted é um closure, porque a função retornada tem acesso ao escopo da função useEffect
    let isMounted = true // cria uma variável no escopo da função useEffect
    return () => { // retorna uma função que tem acesso ao escopo da função useEffect
      console.log('Cleaning function', isMounted)
      return isMounted = false // altera o valor da variável isMounted. 
    }
  }, [])

// o useState é um closure, porque ele tem acesso ao escopo da função App
function App() {
  // count é uma variável que pertence ao escopo da função App
  // função App é um closure, porque ela tem acesso ao escopo da função useState
  const [count, setCount] = useState(0) // cria uma variável no escopo da função App
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

// caso o useState fosse uma função pura, não seria um closure, porque ele não teria acesso ao escopo da função App
function useState(count) {
    return count++ // cria uma variável no escopo da função useState.
    // count é uma variável que pertence ao escopo da função useState e não tem acesso ao escopo da função App
    // quando a função useState é chamada, um novo contexto de execução é criado e a variável count é criada no contexto de execução da função useState
} // ao ser declarada desta forma, a função useState não tem acesso ao escopo da função App

function App() {
  const count = 0
  const setCount = useState(count)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
// toda vez que setCount é chamado, a função useState é chamada e um novo contexto de execução é criado, e a variável count é criada no contexto de execução da função useState

// para transformar a função useState em um closure, é necessário que ela tenha acesso ao escopo da função App
// ex.:
function useState() {
  let count = 0 // cria uma variável no escopo da função useState
  return function() { // retorna uma função que tem acesso ao escopo da função useState
    return count++ // altera o valor da variável count
  }
}

// algoritmo do useState do React com retorno de valor e função de atualização do valor baseado na forma como a função de alteração do valor é chamada
function useState(initialValue) {
  let value = initialValue
  return [
    value,
    function(newValue) {
      return value = newValue
    }
  ]
}

// se quisermos para um novo valor para a variável count, é necessário chamar a função de atualização do valor
// ex.:
const [count1, setCount1] = useState(0)
setCount1(1) // altera o valor da variável count para 1
console.log(count1) // retorna 0 porque a função de atualização do valor não altera o valor da variável count, ela retorna o novo valor.
// Este novo valor é retornado, mas não é armazenado em count1, apenas em um novo render da função App o valor de count1 é atualizado devido ao facto de a função useState ser chamada novamente
// Explicando em outras palavras, a função useState é chamada novamente e um novo contexto de execução é criado e a variável count é criada no contexto de execução da função useState e o valor de count é atualizado para 1
// ex.:
function ExplicandoUseState() {
  const [count1, setCount1] = useState(0)
  setCount1(1) // altera o valor da variável count para 1
  console.log(count1) // retorna 0 porque a função de atualização do valor não altera o valor da variável count, ela retorna o novo valor
  // em um novo render da função ExplicandoUseState o valor de count1 é atualizado para 1 porque a função useState é chamada novamente na linha 3 e
  // um novo contexto de execução é criado e a variável count é criada no contexto de execução da função useState e o valor de count é atualizado para 1
  // mesmo que na linha 2 count1 seja 0, na linha 3 count1 é atualizado para 1
}

setCount1(2) // altera o valor da variável count para 2
setCount1(3) // altera o valor da variável count para 3

// se quisermos acessar o valor da variável count, é necessário chamar a função de retorno do valor
// ex.:
const [count2, setCount2] = useState(0)
console.log(count2) // retorna 0
setCount2(1) // altera o valor da variável count para 1
console.log(count2) // retorna 0 porque a função de atualização do valor não altera o valor da variável count, ela retorna o novo valor
console.log(setCount2(1)) // retorna 1 porque a função de atualização do valor retorna o novo valor da variável count

// se quisermos alterar o valor da variável count3 com base no valor anterior, é necessário chamar a função de atualização do valor
// ex.:
const [count3, setCount3] = useState(0)
console.log(count3) // retorna 0
setCount3(count3 + 1) // altera o valor da variável count para 1
console.log(count3) // retorna 0 porque a função de atualização do valor não altera o valor da variável count, ela retorna o novo valor
// entretanto se fizermos
setCount3(previous => previous + 1) // altera o valor da variável count para 1 porque a função de atualização do valor retorna o novo valor da variável count
// ao passarmos uma arrow function para a função de atualização do valor, o valor anterior é passado como argumento para a arrow function e o novo valor é retornado
// a arrow function é chamada com o valor anterior da variável count e o novo valor é retornado

// a diferença entre a função de atualização do valor e a função de retorno do valor é que a função de atualização do valor altera o valor da variável count e a função de retorno do valor retorna o valor da variável count
// a função de atualização do valor altera o valor da variável count e a função de retorno do valor retorna o valor da variável count
// ou seja, a função de retorno é um callback que retorna o valor da variável count e a função de atualização é um callback que altera o valor da variável count

// ex. explicando as diferenças entre a função de atualização do valor e a função de retorno do valor
const [count4, setCount4] = useState(0)
console.log(count4) // retorna 0
setCount4(count4 + 1) // essa função de atualização do valor não altera o valor da variável count, em uma nova renderização o valor de count4 é atualizado para 1
setCount4(previous => previous + 1) // altera o valor da variável count para 1 porque a função de atualização do valor retorna o novo valor da variável count

// ao chamarmos esses exemplos repetidas vezes em uma mesma função
// ex.:
const [count5, setCount5] = useState(0)
setCount5(count5 + 1)
setCount5(count5 + 1)
setCount5(count5 + 1)
setCount5(count5 + 1)
setCount5(count5 + 1)
// o valor de count5 não é atualizado, porque a função de atualização do valor não altera o valor da variável count, em uma nova renderização o valor de count5 é atualizado para 1
// entretanto se fizermos
setCount5(previous => previous + 1)
setCount5(previous => previous + 1)
setCount5(previous => previous + 1)
setCount5(previous => previous + 1)
setCount5(previous => previous + 1)
// o valor de count5 é atualizado para 5, porque a função de atualização do valor retorna o novo valor da variável count

// ou seja, a função de atualização do valor não altera o valor da variável count, ela retorna o novo valor da variável count e a função de retorno do valor retorna o valor da variável count

// o algoritmo real do useState do React é:
function useState(initialValue) {
  let value = initialValue
  return [
    value,
    function(newValue) {
      return value = newValue
    }
  ]
}


