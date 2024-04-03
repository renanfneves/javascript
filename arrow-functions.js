// Arrow Functions

// arrow functions não possuem o this e arguments, por isso são mais leves e rápidas

const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const calculate = fn => (a, b) => fn(a, b);

// retornando um objeto
const createPerson = (name, city, year) => ({ name, city, year });
console.log(createPerson('Renan', 'São Paulo', 1990));