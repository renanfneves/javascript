// # Modules
// São arquivos que podem ser importados em outros arquivos. Cada arquivo é um módulo e pode exportar funções, objetos, classes, variáveis, etc. para serem utilizados em outros módulos.
// Para utilizar modules no Node.js os arquivos devem ter a extensão .mjs além de executar com a flag --experimental-modules.

// ## Import
// Permite importar qualquer tipo de dado existente dentro de um modulo.


import Circle from './circle.mjs'; // Importa o dado exportado por padrão de um módulo.
const circle = new Circle(10);
console.log(circle); // Circle { radius: 10 }
console.log(circle.area); // 314.159265359

// ## Export
// Permite exportar qualquer tipo de dado existente dentro de um modulo.
// Podemos exportar um dado por padrão, ou seja, apenas um dado por módulo utilizando a palavra chave default.
// Só é possível exportar um default por módulo.
