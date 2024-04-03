// # Iterables e Iterators

// São convenções implementadas por Arrays, Maps, Sets, Strings que os tornam iteráveis por meio de um protocolo de iteração.

const classicLanguages = ['Fortan', 'Lisp', 'COBOL'];
for (let i = 0; i < classicLanguages.length; i++) {
  console.log(classicLanguages[i]);
}
for (let i in classicLanguages) {
  console.log(classicLanguages[i]);
}
classicLanguages.forEach(language => {
  console.log(language);
});
classicLanguages.forEach((language) => {
  console.log(language);
});
for (let language of classicLanguages) {
  console.log(language);
}
// para que o for of funcione o objeto que está sendo iterado deve seguir a convenção "iterable e iterator"
// o primeiro uso dos iterables é dentro do for of

// o segundo uso é dentro do spread operator
const modernLanguages = ['Python', 'Ruby', 'JavaScript'];
const languages = [...classicLanguages, ...modernLanguages];  // spread operator

// podemos usar o protocolo com objetos literais, Maps, Sets, Strings.

const languagesMap = new Map([['Fortran', 1957], ['Lisp', 1958], ['COBOL', 1959]]);
console.log(languagesMap); // Map { 'Fortran' => 1957, 'Lisp' => 1958, 'COBOL' => 1959 }
for (let [language, year] of languagesMap) {
  console.log(language, year); // Fortran 1957, Lisp 1958, COBOL 1959
}
console.log([...languagesMap]); // [ [ 'Fortran', 1957 ], [ 'Lisp', 1958 ], [ 'COBOL', 1959 ] ]

const languagesSet = new Set(['Fortran', 'Lisp', 'COBOL']);
console.log(languagesSet); // Set { 'Fortran', 'Lisp', 'COBOL' }
for (let language of languagesSet) {
  console.log(language); // Fortran, Lisp, COBOL
}
console.log([...languagesSet]); // [ 'Fortran', 'Lisp', 'COBOL' ]

const language = 'COBOL';
for (let char of language) {
  console.log(char); // C, O, B, O, L
}
console.log([...language]); // [ 'C', 'O', 'B', 'O', 'L' ]


// Todo Iterable tem uma propriedade chamada Symbol.iterator que define o protocolo de iteração para o objeto.

const languages2 = ['Fortran', 'Lisp', 'COBOL'];
const iterator = languages2[Symbol.iterator]();
console.log(iterator.next()); // { value: 'Fortran', done: false }
// toda vez que chamamos o método next ele retorna um objeto com duas propriedades: value e done
// value é o valor do elemento e done é um booleano que indica se a iteração terminou

console.log(iterator.next()); // { value: 'Lisp', done: false }
console.log(iterator.next()); // { value: 'COBOL', done: false }
console.log(iterator.next()); // { value: undefined, done: true }

const languages3Map = new Map([['Fortran', 1957], ['Lisp', 1958], ['COBOL', 1959]]);
const iteratorMap = languages3Map.entries();
console.log(iteratorMap.next()); // { value: [ 'Fortran', 1957 ], done: false }
console.log(iteratorMap.next()); // { value: [ 'Lisp', 1958 ], done: false }
console.log(iteratorMap.next()); // { value: [ 'COBOL', 1959 ], done: false }
console.log(iteratorMap.next()); // { value: undefined, done: true }
const iteratorMapKeys = languages3Map.keys();
console.log(iteratorMapKeys.next()); // { value: 'Fortran', done: false }
console.log(iteratorMapKeys.next()); // { value: 'Lisp', done: false }
console.log(iteratorMapKeys.next()); // { value: 'COBOL', done: false }
console.log(iteratorMapKeys.next()); // { value: undefined, done: true }
const iteratorMapValues = languages3Map.values();
console.log(iteratorMapValues.next()); // { value: 1957, done: false }
console.log(iteratorMapValues.next()); // { value: 1958, done: false }
console.log(iteratorMapValues.next()); // { value: 1959, done: false }
console.log(iteratorMapValues.next()); // { value: undefined, done: true }
const iteratorMapSymbol = languages3Map[Symbol.iterator]();
console.log(iteratorMapSymbol.next()); // { value: [ 'Fortran', 1957 ], done: false }
console.log(iteratorMapSymbol.next()); // { value: [ 'Lisp', 1958 ], done: false }
console.log(iteratorMapSymbol.next()); // { value: [ 'COBOL', 1959 ], done: false }
console.log(iteratorMapSymbol.next()); // { value: undefined, done: true }


const languages4Set = new Set(['Fortran', 'Lisp', 'COBOL']);
const iteratorSetKeys = languages4Set.keys();
console.log(iteratorSetKeys.next()); // { value: 'Fortran', done: false }
console.log(iteratorSetKeys.next()); // { value: 'Lisp', done: false }
console.log(iteratorSetKeys.next()); // { value: 'COBOL', done: false }
console.log(iteratorSetKeys.next()); // { value: undefined, done: true }
const iteratorSetValues = languages4Set.values();
console.log(iteratorSetValues.next()); // { value: 'Fortran', done: false }
console.log(iteratorSetValues.next()); // { value: 'Lisp', done: false }
console.log(iteratorSetValues.next()); // { value: 'COBOL', done: false }
console.log(iteratorSetValues.next()); // { value: undefined, done: true }
const iteratorSetEntries = languages4Set.entries();
console.log(iteratorSetEntries.next()); // { value: [ 'Fortran', 'Fortran' ], done: false }
console.log(iteratorSetEntries.next()); // { value: [ 'Lisp', 'Lisp' ], done: false }
console.log(iteratorSetEntries.next()); // { value: [ 'COBOL', 'COBOL' ], done: false }
console.log(iteratorSetEntries.next()); // { value: undefined, done: true }
const iteratorSetSymbol = languages4Set[Symbol.iterator]();
console.log(iteratorSetSymbol.next()); // { value: 'Fortran', done: false }
console.log(iteratorSetSymbol.next()); // { value: 'Lisp', done: false }
console.log(iteratorSetSymbol.next()); // { value: 'COBOL', done: false }
console.log(iteratorSetSymbol.next()); // { value: undefined, done: true }


// Como criar um objeto iterável
function createIterable(...array) {
  return {
    [Symbol.iterator]() { // Symbol.iterator é uma propriedade que define o protocolo de iteração
      let i = 0;
      return {
        next() {
          if (i < array.length) {
            return {
              value: array[i++],
              done: false,
            };
          } else {
            return {
              value: undefined,
              done: true,
            };
          }
        }
      }
    }
  }
}
const iteratorCreate = createIterable('Fortran', 'Lisp', 'COBOL');
console.log(iteratorCreate.next()); // { value: 'Fortran', done: false }
console.log(iteratorCreate.next()); // { value: 'Lisp', done: false }
console.log(iteratorCreate.next()); // { value: 'COBOL', done: false }
console.log(iteratorCreate.next()); // { value: undefined, done: true }

