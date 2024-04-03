// import { PI as pi, pow } from './math.mjs'; // É possível utilizar um alias na importação renomeando o que estiver sendo importado.

export default class Circle { // Podemos exportar um dado por padrão, ou seja, apenas um dado por módulo utilizando a palavra chave default.
  constructor(radius) {
    this.radius = radius;
  }
  get area() {
    return math.PI * math.pow(this.radius, 2);
  }
}
import * as math from './math.mjs'; // Importa todos os dados exportados de um módulo em um objeto.

// Imports sobrem processo de hoisting, ou seja, são movidos para o topo do arquivo.
// Entretanto não é permitido realizar a importação e exportação dentro de blocos.

// function fn1() {
//   import * as math from './math.mjs'; // SyntaxError: Cannot use import statement inside a function
// }