//  # ASYNC AWAIT
//  Facilita a interação com chamadas assíncronas, aguardando o retorno de uma determinada promise.


function sum(a, b) {
  return new Promise(resolve => {
    if (!a || !b) reject("Invalid arguments");
    setTimeout(function() {
      resolve(a + b);
    }, 1000);
  });
}

async function asyncFn() {
  const a = await sum(2, 2);
  const b = await sum(4, 4);
  const result = await sum(a, b);
  return result;
}

(async function() {
  try {
    const a = await sum(2, 2);
    const b = await sum(4, 4);
    const result = await sum(a, b);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();

// É possível iterar utilizando o async/await?
// Sim, é possível iterar utilizando o async/await, porém, é necessário utilizar um loop para aguardar o retorno de cada promise.
// Podemos usar o for...of para iterar sobre um array de funções que retornam promises.
(async function() {
  try {
    const functions = [
      sum(2, 2),
      sum(4, 4),
    ];
    const results = [];
    for(const fn of functions) {
      const result = await fn;
      results.push(result);
    }
    const [a, b] = results;
    const result = await sum(a, b);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();

// mais recentemente foi introduzido o for-await-of, que permite iterar sobre promises.
// para utilizar o for-await-of é necessário rodar o código com a flag --harmony-async-iteration.
// (async function() {
//   try {
//     const functions = [
//       sum(2, 2),
//       sum(4, 4),
//     ];
//     const results = [];
//     for await(const result of functions) {
//       results.push(result);
//     }
//     const [a, b] = results;
//     const result = await sum(a, b);
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// })();


// Crie uma função utilizando async.
// Invoque cada uma das funções execute utilizando await incluindo o Promise.all.
// Envolva as chamadas em um bloco try/catch para tratar as exceções.

