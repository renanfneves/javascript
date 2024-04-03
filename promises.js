// # Promises

// São objetos responsáveis por modelar comportamento assíncrono, permitindo o seu tratamento de uma forma mais fácil e direta.

function sum(a, b) {
  setTimeout(function () {
    return a + b; // aqui estamos retornando o valor da soma, mas a função sum não retorna nada, então o valor retornado é undefined
  }, 1000);
}
const result = sum(2, 2);
console.log(result); // undefined

// sincronismo de forma explícita
function sumSync(a, b, callback) {
  setTimeout(function () {
    callback(a + b); // aqui estamos chamando a função de callback passada como argumento que neste momento tem o valor passado como argumento na chamada da função sumSync
  }, 1000);
}

const resultSync = sumSync(2, 2, function (result) {
  console.log(result); // 4
});

// aninhado
function sumSyncNested(a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
}
sumSyncNested(2, 2, function (a) {
  sumSyncNested(4, 4, function (b) {
    sumSyncNested(a, b, function (result) {
      console.log(result); // 12
    });
  });
});

// com promise
function sumPromise(a, b) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(a + b);
    }, 1000);
  });
}
sumPromise(2, 2).then(function (a) {
  sumPromise(4, 4).then(function (b) {
    sumPromise(a, b).then(function (result) {
      console.log(result); // 12
    });
  });
});

// ## Reject e Catch
function sumPromiseReject(a, b) {
  return new Promise(function (resolve, reject) {
    if (!a || !b) {
      reject('Não é permitido somar zeros');
    }
    setTimeout(function () {
      resolve(a + b);
    }, 1000);
  });
}
sumPromiseReject(2, 2).then(function (a) {
  return sumPromiseReject(4, 4).then(function (b) {
    return sumPromiseReject().then(function (result) {
      console.log(result); // 12
    });
  });
}).catch(function (error) {
  console.log(error);
});

// podemos encadear os catches para tratar erros específicos apenas retornando as promises

// ## Promise.all
// Podemos executar várias promises ao mesmo tempo, retornando após todas terem sucesso usando Promise.all
console.time('Promise.all');
Promise.all([sumPromise(2, 2), sumPromise(4, 4)]).then(function (values) {
  console.log(values); // [4, 8]
  const [a, b] = values;
  console.log(a, b);
  return sumPromise(a, b).then(function (result) {
    console.log('Promise.all', result); // 12
    console.timeEnd('Promise.all');
  });
}).catch(function (error) {
  console.log(error);
});

// ## Promise.race
// Podemos executar várias promises ao mesmo tempo, retornando após a primeira ter sucesso usando
