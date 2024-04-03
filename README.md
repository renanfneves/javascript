# Contexto de Criação e Execução

## 1. Explique a diferença entre contexto de criação e contexto de execução em JavaScript.

O contexto de criação refere-se ao momento em que funções, variáveis e objetos são declarados e o escopo léxico é estabelecido. Durante essa fase, o interpretador JavaScript processa a declaração de funções (permitindo que sejam "hoisted") e declarações de variáveis (com var sendo hoisted mas não inicializadas).

O contexto de execução, por outro lado, é o ambiente em que o código é efetivamente executado e avaliado. Isso inclui a criação de um objeto de contexto de execução, que contém informações sobre o ambiente onde o código está sendo executado, como o objeto this, o escopo atual, e o código que está sendo executado. Cada função chamada cria um novo contexto de execução, que é empilhado sobre o contexto de execução atual na pilha de execução.

## 2. Como o hoisting afeta variáveis e funções no contexto de criação?

O hoisting é um comportamento em JavaScript onde declarações de funções e declarações de variáveis são movidas para o topo de seu escopo antes da execução do código. Para funções, isso significa que você pode chamar uma função antes de declará-la no código:


`helloWorld();`

`function helloWorld() {`
  `console.log("Hello, world!");`
`}`

Para variáveis declaradas com var, o hoisting significa que a declaração é movida para o topo, mas a inicialização não. Tentar acessar a variável antes da linha de sua inicialização resultará em undefined:


`console.log(x); // undefined`
`var x = 5;`

Variáveis declaradas com let e const também são hoisted, mas não são inicializadas e entram em uma "zona morta temporal" até que a declaração seja alcançada, resultando em um erro se acessadas antes disso.

## . Dê um exemplo de como o contexto léxico influencia uma closure.
O contexto léxico se refere ao ambiente em que uma função foi declarada, o que é crucial para o funcionamento das closures. Uma closure ocorre quando uma função é capaz de acessar variáveis do escopo no qual foi declarada, mesmo após esse escopo ter sido fechado:


function criarSaudacao(saudacao) {
  return function(nome) {`
    console.log(`${saudacao}, ${nome}!`);
  };
}

`const saudacaoHello = criarSaudacao("Hello");`
`saudacaoHello("Alice"); // Hello, Alice!`

Aqui, a função interna retorna uma closure que lembra o valor de saudacao ("Hello"), um exemplo de como o contexto léxico é preservado.

## 4. Qual é a diferença entre o objeto global no Node.js e o objeto window no navegador?

No navegador, o objeto global é window. Ele representa a janela do navegador e contém propriedades e métodos para manipulação de elementos do DOM, manipulação de eventos, armazenamento, etc.

No Node.js, o objeto global é global. Ele fornece acesso a funções e variáveis globais do ambiente de execução do Node.js, incluindo módulos built-in, controle de processos, buffers, e outras funcionalidades específicas do servidor ou do ambiente de execução do Node.

Apesar de servirem a propósitos similares em seus respectivos ambientes, window e global contêm propriedades e métodos específicos para as necessidades do desenvolvimento web no navegador e no servidor, respectivamente.

## 5. Como o objeto this é determinado no contexto de execução de uma função?
O valor de this em JavaScript é determinado pelo contexto de execução da função, isto é, como e onde a função é chamada:

Em funções chamadas diretamente no escopo global, this refere-se ao objeto global (window no navegador ou global no Node.js), a menos que o modo estrito ('use strict';) seja utilizado, o que faz com que this seja undefined.
Quando uma função é chamada como um método de um objeto, this se refere ao objeto que possui o método.
Ao utilizar métodos como **call(), apply(),

# Funções Simples

## 1. Soma de Todos os Números Pares de um Array

function somaPares(array) {
  return array.filter(n => n % 2 === 0).reduce((acc, curr) => acc + curr, 0);
}

console.log(somaPares([1, 2, 3, 4, 5, 6])); // 12

## 2. Transformar Todas as Letras de uma String em Maiúsculas

function paraMaiusculas(str) {
  return str.toUpperCase();
}

console.log(paraMaiusculas("hello world")); // "HELLO WORLD"

## 3. Calcular a Área de um Círculo Dado seu Raio

function areaCirculo(raio) {
  return Math.PI * raio * raio;
}

console.log(areaCirculo(5)); // 78.53981633974483

## 4. Inverter a Ordem dos Caracteres de uma String
javascript
Copy code
function inverterString(str) {
  return str.split('').reverse().join('');
}

console.log(inverterString("hello")); // "olleh"

## 5. Ordenar um Array de Números em Ordem Decrescente
javascript
Copy code
function ordenarDecrescente(array) {
  return array.sort((a, b) => b - a);
}

console.log(ordenarDecrescente([3, 1, 4, 1, 5, 9, 2, 6])); // [9, 6, 5, 4, 3, 2, 1, 1]

# Closures

## 1. Crie uma função que retorne uma função de contagem regressiva a partir de um número dado.

function contagemRegressiva(numeroInicial) {
  let contador = numeroInicial + 1;
  return function() {
    contador -= 1;
    return contador >= 0 ? contador : "Contagem terminou!";
  };
}

const minhaContagem = contagemRegressiva(3);
console.log(minhaContagem()); // 3
console.log(minhaContagem()); // 2
console.log(minhaContagem()); // 1
console.log(minhaContagem()); // 0
console.log(minhaContagem()); // "Contagem terminou!"

## 2. Desenvolva uma função que crie um contador privado utilizando closures.

function criarContador() {
  let contador = 0;
  return {
    incrementar: function() {
      contador++;
    },
    decrementar: function() {
      contador--;
    },
    valorAtual: function() {
      return contador;
    }
  };
}

const meuContador = criarContador();


## 3. Faça uma função que crie um gerador de IDs único com closures.

function criarGeradorId() {
  let id = 0;
  return function() {
    id += 1;
    return id;
  };
}

const geradorId = criarGeradorId();
console.log(geradorId()); // 1
console.log(geradorId()); // 2


meuContador.incrementar();
console.log(meuContador.valorAtual()); // 1
meuContador.decrementar();
console.log(meuContador.valorAtual()); // 0

## 4. Implemente uma função que possa criar e gerenciar vários contadores independentes.

function criarContadores() {
  let contadores = {};
  return {
    criarContador: function(nome) {
      contadores[nome] = 0;
    },
    incrementar: function(nome) {
      if (nome in contadores) {
        contadores[nome]++;
      }
    },
    valorAtual: function(nome) {
      return nome in contadores ? contadores[nome] : undefined;
    }
  };
}

const contadores = criarContadores();
contadores.criarContador('primeiro');
contadores.incrementar('primeiro');
console.log(contadores.valorAtual('primeiro')); // 1
contadores.criarContador('segundo');
contadores.incrementar('segundo');
console.log(contadores.valorAtual('segundo')); // 1


## 5. Escreva uma função que memorize os resultados de invocações anteriores e retorne o cache se a mesma entrada for fornecida.

function memorizar(fn) {
  const cache = {};
  return function(...args) {
    const chave = JSON.stringify(args);
    if (!(chave in cache)) {
      cache[chave] = fn.apply(this, args);
    }
    return cache[chave];
  };
}

// Exemplo de uso
function soma(a, b) {
  return a + b;
}

const somaMemorizada = memorizar(soma);
console.log(somaMemorizada(1, 2)); // 3
console.log(somaMemorizada(1, 2)); // 3 (retorna do cache)

# This

## 1. Explique como o método bind altera o contexto de this de uma função.
## 2. Dê um exemplo de uso de call e apply para mudar o contexto de this.
## 3. Demonstre um caso onde this se comporta de maneira inesperada e como corrigi-lo.
## 4. Crie um método dentro de um objeto literal que utilize this para acessar outras propriedades do objeto.
## 5. Explique o comportamento de this em um método de objeto quando o método é passado como referência para um event listener.

# Arrow Functions

## 1. Converta uma função anônima em uma arrow function.
## 2. Explique como uma arrow function difere de uma função tradicional em termos de this.
## 3. Crie uma arrow function que use o operador rest para aceitar um número variável de argumentos.
## 4. Demonstre o uso de arrow functions em encadeamento de métodos de array (como .map, .filter, .reduce).
## 5. Faça uma arrow function que retorne um objeto literal sem usar a palavra-chave return.

# Objetos Literais

## 1. Crie um objeto literal que represente um livro com propriedades para título, autor e ano.
## 2. Adicione um método ao objeto livro que retorne uma string contendo o título e o autor.
## 3. Demonstre como criar propriedades computadas em um objeto literal com ES6.
## 4. Faça um objeto literal que contenha um array de objetos representando diferentes tipos de pets, cada um com propriedades para nome, tipo e idade.
## 5. Escreva um método dentro de um objeto literal que calcule a idade média de todos os pets.

# Miscelânea

## 1. Implemente uma função construtora que simule um simples banco com métodos para depósito e saque.
## 2. Crie uma função que use Promise para simular uma operação assíncrona.
## 3. Converta a função com Promise do exercício anterior para async/await.
## 4. Explique com exemplos a diferença entre var, let e const.
## 5. Desenvolva uma função que remova duplicatas de um array sem usar estruturas de dados adicionais.
## 6. Implemente uma função que compare duas strings e retorne true se forem anagramas um do outro, false caso contrário.
## 7. Crie uma função que determine se uma string é um palíndromo.
## 8. Escreva uma função que receba dois arrays e retorne um novo array com os elementos que estão em ambos.
## 9. Desenvolva uma função que transforme um objeto em um array de pares [chave, valor].
## 10. Implemente um simples sistema de módulos que simule o comportamento de importação e exportação entre arquivos.

# Desafios de Lógica 

## 1. Escreva uma função que encontre o número que falta em uma sequência.
## 2. Implemente uma função que determine se um número é primo.
## 3. Crie uma função que retorne o n-ésimo número da sequência de Fibonacci.
## 4. Desenvolva uma função que inverta um número inteiro (por exemplo, de 1234 para 4321).
## 5. Faça uma função que receba um número e retorne um array com todos os divisores desse número.

# Desafios de Performance

## 1. Escreva uma função que melhore a performance ao acessar propriedades de um objeto profundamente aninhado.
## 2. Implemente uma função de busca binária em um array de números ordenados.
## 3. Desenvolva uma função que execute a ordenação de um array grande de maneira mais eficiente possível.
## 4. Crie uma função que detecte ciclos em um objeto (referências circulares).
## 5. Implemente uma função que realize a compressão de strings usando a contagem de caracteres repetidos (por exemplo, "aabcccccaaa" se tornaria "a2b1c5a3").
## 6. Esses exercícios abrangem uma ampla gama de tópicos importantes em JavaScript, desafiando você a aplicar e aprofundar seu entendimento sobre conceitos essenciais e avançados da linguagem. Eles são ideais para desenvolvedores que desejam testar ou expandir suas habilidades em preparação para entrevistas de emprego ou para aprimoramento pessoal.