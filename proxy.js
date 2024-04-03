// # Proxy
// Interceptam um objeto e adicionamos funcionalidades a ele. O objeto interceptado é chamado de target.

// function createArray() {
//   return {};
// }
// const languages = createArray();
// languages[0] = 'Python';
// languages[1] = 'Ruby';
// languages[2] = 'JavaScript';
// console.log(languages); // { '0': 'Python', '1': 'Ruby', '2': 'JavaScript' }  
// console.log(languages.length); // undefined

// com proxy
function createArrayWithProxy() {
  return new Proxy({}, { // Proxy recebe dois argumentos, o objeto target e um objeto com os traps (handler que intercepta as operações)
    set(target, key, value) { // set é um trap que é invocado quando uma propriedade é definida no objeto. Recebe três argumentos: o objeto target, a chave e o valor. O objeto target neste caso é o mesmo objeto alvo criado no proxy que está sendo interceptado.
      target.length = target.length || 0;
      target.length++;
      target[key] = value; // Adiciona a propriedade ao objeto target
    },
    get(target, key) { // get é um trap que é invocado quando uma propriedade é lida do objeto. Recebe dois argumentos: o objeto target e a chave.
      if(typeof key === "string" && key.match(/\d+/)) { // Verifica se a chave é do tipo string e se contém apenas números.
        if(!(key in target)) { // Verifica se a chave não existe no objeto target.
          throw new Error(`Property ${key} not found`); // Lança um erro.
        }
      }
      return target[key]; 
    },
    deleteProperty(target, key) { // deleteProperty é um trap que é invocado quando uma propriedade é deletada do objeto. Recebe dois argumentos: o objeto target e a chave.
      if (key in target) {
        target.length--;
        delete target[key]; // Deleta a propriedade do objeto target;
      }
    }
  });
}
const languagesWithProxy = createArrayWithProxy();
languagesWithProxy[0] = 'Python';
languagesWithProxy[1] = 'Ruby';
languagesWithProxy[2] = 'JavaScript';
console.log(languagesWithProxy); // { '0': 'Python', '1': 'Ruby', '2': 'JavaScript', length: 3 }
console.log(languagesWithProxy.length); // 3
delete languagesWithProxy[1];
delete languagesWithProxy[2];
delete(languagesWithProxy[3]);
console.log(languagesWithProxy) // { '0': 'Python', length: 1 }
console.log(languagesWithProxy.length); // 1

// Existem métodos, chamados de trap, para diversos tipos de eventos relacionados a um objeto.
// O Método set é um trap que é invocado quando uma propriedade é definida no objeto.

// ## Métodos de trap

// apply(target, thisArg, argumentsList) // - Invocado quando uma função é chamada.
// construct(target, argumentsList, newTarget) // - Invocado quando uma instância é criada.
// defineProperty(target, key, descriptor) // - Invocado quando uma propriedade é definida.
// deleteProperty(target, key) // - Invocado quando uma propriedade é deletada.
// get(target, key, receiver) // - Invocado quando uma propriedade é lida.
// getOwnPropertyDescriptor(target, key) // - Invocado quando a descrição de uma propriedade é lida.
// getPrototypeOf(target) // - Invocado quando o protótipo é lido.
// has(target, key) // - Invocado quando a existência de uma propriedade é verificada.
// isExtensible(target) // - Invocado quando a extensibilidade do objeto é verificada.
// ownKeys(target) // - Invocado quando as chaves do objeto são lidas.
// preventExtensions(target) // - Invocado quando a extensibilidade do objeto é alterada.
// set(target, key, value, receiver) // - Invocado quando uma propriedade é definida.
// setPrototypeOf(target, prototype) // - Invocado quando o protótipo é definido.

// # Reflect API
// tem os mesmos métodos que existem no Proxy, permitindo a execução de diversos tipos de operações no objeto target.

function createArrayWithProxyAndReflect() {
  return new Proxy({}, { // Proxy recebe dois argumentos, o objeto target e um objeto com os traps (handler que intercepta as operações)
    set(target, key, value) { // set é um trap que é invocado quando uma propriedade é definida no objeto. Recebe três argumentos: o objeto target, a chave e o valor. O objeto target neste caso é o mesmo objeto alvo criado no proxy que está sendo interceptado.
      target.length = target.length || 0;
      target.length++;
      Reflect.set(target, key, value); // Chama o método set da Reflect API
    },
    get(target, key) { // get é um trap que é invocado quando uma propriedade é lida do objeto. Recebe dois argumentos: o objeto target e a chave.
      if(typeof key === "string" && key.match(/\d+/)) { // Verifica se a chave é do tipo string e se contém apenas números.
        if(!Reflect.has(target, key)) { // Verifica se a chave não existe no objeto target.
          throw new Error(`Property ${key} not found`); // Lança um erro.
        }
      }
      return Reflect.get(target, key); 
    },
    deleteProperty(target, key) { // deleteProperty é um trap que é invocado quando uma propriedade é deletada do objeto. Recebe dois argumentos: o objeto target e a chave.
      if (!Reflect.has(target, key)) {
        target.length--;
        Reflect.deleteProperty(target, key); // Chama o método deleteProperty da Reflect API
      }
    }
  });
}
const languagesWithProxyAndReflect = createArrayWithProxyAndReflect();
languagesWithProxyAndReflect[0] = 'Python';
languagesWithProxyAndReflect[1] = 'Ruby';
languagesWithProxyAndReflect[2] = 'JavaScript';
console.log(languagesWithProxyAndReflect); // { '0': 'Python', '1': 'Ruby', '2': 'JavaScript', length: 3 }
console.log(languagesWithProxyAndReflect.length); // 3
delete languagesWithProxyAndReflect[1];
delete languagesWithProxyAndReflect[2];
delete languagesWithProxyAndReflect[3];
console.log(languagesWithProxyAndReflect); // { '0': 'Python', length: 1 }
console.log(languagesWithProxyAndReflect.length); // 1
