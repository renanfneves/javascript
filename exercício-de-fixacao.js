const statement = "create table author (id number, name string, age number, city string, state string, country string)"

// 1. Criar um objeto chamado database com uma propriedade chamada tables
const regexp = /create table ([a-z]+) \((.+)\)/
const parsedStatement = statement.match(regexp)
const tableName = parsedStatement[1]

// 2. Dentro do objeto tables, criar um objeto para cada tabela
let columns = parsedStatement[2]
columns = columns.split(", ")

const database = {
  tables: {
    [tableName]: {
      columns: {},
      data: []
    }
  },
}

for (let column of columns) {
  const [name, type] = column.trim().split(" ")
  database.tables[tableName].columns[name] = type
}

console.log(JSON.stringify(database, undefined, " "))

// 3. Crie dois métodos no objeto "database" chamados de "createTable" e "execute".
// O comando "createTable" já foi implementado no exercício anterior, mova o código e utilize o método "execute" para invocar dinamicamente o método "createTable".

const database3 = {
  tables: {},
  createTable(statement) {
    const regexp = /create table ([a-z]+) \((.+)\)/
    const parsedStatement = statement.match(regexp)
    const tableName = parsedStatement[1]
    let columns = parsedStatement[2]
    columns = columns.split(", ")
    this.tables = { [tableName]: { columns: {}, data: [] } }
    for (let column of columns) {
      const [name, type] = column.trim().split(" ")
      this.tables[tableName].columns[name] = type
    }
  },
  execute(statement) {
    if(statement.startsWith("create table")) {
      this.createTable(statement)
    }
  }
}

database3.execute("create table author (id number, name string, age number, city string, state string, country string)");
console.log(JSON.stringify(database3, undefined, " "));

// 4. Lance uma exceção caso o comando não exista, interrompendo o fluxo de execução.

function DatabaseError(statement, message) {
  this.statement = statement
  this.message = message
}

const database4 = {
  tables: {},
  createTable(statement) {
    const regexp = /create table ([a-z]+) \((.+)\)/
    const parsedStatement = statement.match(regexp)
    const tableName = parsedStatement[1]
    let columns = parsedStatement[2]
    columns = columns.split(", ")
    this.tables = { [tableName]: { columns: {}, data: [] } }
    for (let column of columns) {
      const [name, type] = column.trim().split(" ")
      this.tables[tableName].columns[name] = type
    }
  },
  execute(statement) {
    if(!statement.startsWith("create table")) {
      throw new DatabaseError(statement, "Syntax error")
    }
    this.createTable(statement);
  }
}

try {
  database4.execute("create table author (id number, name string, age number, city string, state string, country string)");
} catch (error) {
  console.log('Error 1 ->', error.message)
}

try {
  database4.execute("select id, name from author");
} catch (error) {
  console.log('Error 2 ->', error.message)
}

// 5.
// - No objeto "database", crie um método chamado "insert", que recebe o comando por parâmetro.
// - Na função "execute", invoque o método "insert".
// - Extraia o nome da tabela para a variável "tableName", as colunas para a variável "columns" e os valores para a variável "values".
// - Manipule os valores dentro "columns" e "values", separando-os um a um.
// - Crie um objeto chamado "row" com base nas colunas e valores.
// - Insira o objeto em "data".