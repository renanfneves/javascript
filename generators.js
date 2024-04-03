// # GENERATORS

// Tornam possível pausar a execução de uma determinada função, permitindo a utilização do event loop de forma cooperativa.

// function forever() {
//     let value = 1;
//     while (true) {
//         console.log(value++);
//     }
// }

// function today() {
//     const date = new Date();
//     console.log(data);
// }

// forever();
// today();

// neste exemplo, a função forever() irá executar infinitamente, enquanto a função today() nunca será executada.
// porque a função forever não vai desalocar o event loop.
// para resolver isso, podemos utilizar generators.

function* foreverWithGenetator() {
    let value = 1;
    while (true) {
      try {
        const reset = yield value++;
        if(reset) {
          value = 1;
        }
      } catch (error) {
        console.log(error);        
      }
    }
}

function todayWithGenerator() {
    const date = new Date();
    console.log(data);
}

const foreverGenerator = foreverWithGenetator();
console.log(foreverGenerator); // Object [Generator] {}
console.log(typeof foreverGenerator); // object
console.log(Object.getOwnPropertyNames(foreverGenerator.__proto__.__proto__)) // [ 'next', 'return', 'throw' ] 

// Os generators utilizam o método next para iterar sobre os valores disponíveis durante a execução da função.
foreverGenerator.next(); // { value: 1, done: false }
foreverGenerator.next(); // { value: 2, done: false }
foreverGenerator.next(); // { value: 3, done: false }
foreverGenerator.throw("error"); // { value: undefined, done: true }
foreverGenerator.next(); // { value: 4, done: false }
foreverGenerator.next(); // { value: 5, done: false }
foreverGenerator.next(); // { value: 2, done: false }
foreverGenerator.return("end"); // { value: 'end', done: true }
foreverGenerator.next(true); // { value: 1, done: false }
foreverGenerator.next(); // { value: 2, done: false }
foreverGenerator.next(); // { value: 3, done: false }


// Ao encontrar um yield, a execução da função é pausada até o método next ser invocado novamente.
// O retorno do método next é um objeto contendo value e done, seguindo o protocolo de iteração.
// Por meio do yield é possível retornar valores de forma similar ao return
// Além disso, também é possível enviar um valor para dentro do generator por meio do método next.
// O método return encerra o generator podendo retornar um valor específico.
// O método throw lança uma exceção dentro do generator interrompendo o fluxo de execução caso a exceção não tenha sido tratada adequadamente.

// Onde é possível utilizar os generators?


// ## ITERABLES sem generators
// function createIterable(...array) {
//   return {
//     [Symbol.iterator]() {
//       return {
//         next() {
//           if(i < array.length) {
//             return {
//               value: array[i++],
//               done: false
//             }
//           } else {
//             return {
//               value: undefined,
//               done: true
//             }
//           }
//         }
//       }
//     }
//   }
// }

// ## ITERABLES com generators
function createIterable(...array) {
  return {
    *[Symbol.iterator]() {
      let i = 0;
      while(i < array.length) {
        yield array[i++];
      }
    }
  }
}

const languages = createIterable("Fortran", "Lisp", "COBOL");
for(const language of languages) {
    console.log(language);
}

// Além disso, é possível utilizar generators para sincroniza chamadas assíncronas de forma similar ao async/await.
function sum(a, b) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(a + b);
    }, 1000);
  });
}

function async(fn) {
  const gen = fn();
  asyncRecursive(gen);
}

function asyncRecursive(gen, result) {
  const obj = gen.next(result);
  if(obj.done) return;
  obj.value.then(function(result) {
    asyncRecursive(gen, result);
  });
}

async(function* () {
  const a = yield sum(2, 2);
  const b = yield sum(4, 4);
  const result = yield sum(a, b);
  console.log(result);
});