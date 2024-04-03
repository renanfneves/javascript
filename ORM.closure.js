function DatabaseError(statement, message) {
  this.statement = statement
  this.message = message
}

function ormGenerator(clusterName = "default") {
  const cluster = {
    databases: {},
  }
  return {
    createDatabase(databaseName) {
      cluster.databases[databaseName] = {
        tables: {},
      }
    
      function createTable(statement) {
        const regexp = /create table ([a-z]+) \((.+)\)/
        const parsedStatement = statement.match(regexp)
        let [, tableName, columns] = parsedStatement;
        columns = columns.split(", ")
        cluster.databases[databaseName].tables[tableName] = { columns: {}, data: [] }
        for (let column of columns) {
          const [name, type] = column.trim().split(" ")
          cluster.databases[databaseName].tables[tableName].columns[name] = type
        }
      }
      function insert(statement) {
        const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;
        const parsedStatement = statement.match(regexp);
        let [, tableName, columns, values] = parsedStatement;
        columns = columns.split(", ");
        values = values.split(", ");
        if(!cluster.databases[databaseName].tables[tableName]) {
          throw new DatabaseError(statement, `Table ${tableName} not found`)
        }
        if(columns.length !== values.length) {
          throw new DatabaseError(statement, "Number of columns and values don't match")
        }
        const row = columns.reduce((acc, column, index) => {
          acc[column] = values[index]
          return acc;
        }, {});
        cluster.databases[databaseName].tables[tableName].data.push(row)
      }
      function select(statement) {
        const regexp = /select (.+) from ([a-z]+)(?: where (.+))?(?: and (.+))?/ // ?: inside a capture group actually means that is not a capture group. So it won't be returned in the result and the ? after the group means that the group is optional
        const parsedStatement = statement.match(regexp)
        let [, columns, tableName, conditions] = parsedStatement;
        columns = columns.split(", ");
        if(conditions) {
          conditions = conditions.split(" and ");
        }
        if(!cluster.databases[databaseName].tables[tableName]) {
          throw new DatabaseError(statement, `Table ${tableName} not found`)
        }
        const rows = cluster.databases[databaseName].tables[tableName].data.reduce((acc, row) => {
          if(conditions?.length) {
            for(let condition of conditions) {
              const [column, value] = condition.split(" = ");
              if(row[column] !== value.replace(/^'(.*)'$/, '$1')) {
                return acc;
              }
            }
          }
          let selectedRow = {};
          for(let column of columns) {
            selectedRow[column] = row[column];
          }
          acc.push(selectedRow);
          return acc;
        }, [])
        return rows;
      }
      return {
        execute(statement) {
          const allowedCommands = ["create table", "insert into", "select", "delete", "print database"]
          if(!allowedCommands.some(command => statement.startsWith(command))) {
            throw new DatabaseError(statement, "Syntax error")
          }
          if(statement.startsWith("create table")) {
            return createTable(statement);
          }
          if(statement.startsWith("insert into") && statement.includes("values")) {
            return insert(statement)
          }
          if(statement.startsWith("select")) {
            return select(statement)
          }
          if(statement.startsWith("print database")) {
            console.log(JSON.stringify(cluster.databases[databaseName], undefined, " "))
          }
        }
      } 
    },
    toJSON() {
      console.log(`${clusterName}`, JSON.stringify(cluster, undefined, " "))
    },
    toValue() {
      return cluster
    }
  }
}

const orm = ormGenerator('cluster1')
const database1 = orm.createDatabase('database1')

database1.execute("create table author (id number, name string, age number, city string, state string, country string)");
database1.execute("insert into author (id, name, age, city, state, country) values (1, Renan, 29, Sao Paulo, SP, Brazil)");
database1.execute("insert into author (id, name, age, city, state, country) values (2, Lais, 27, Sao Paulo, SP, Brazil)");

database1.execute("create table book (id number, name string, authorId number)");
database1.execute("insert into book (id, name, authorId) values (1, Node.js, 1)");
database1.execute("insert into book (id, name, authorId) values (2, React, 1)");

const database2 = orm.createDatabase('database2')
database2.execute("create table author (id number, name string, age number, city string, state string, country string)");
database2.execute("insert into author (id, name, age, city, state, country) values (1, Renan, 29, Sao Paulo, SP, Brazil)");
database2.execute("insert into author (id, name, age, city, state, country) values (2, Lais, 27, Sao Paulo, SP, Brazil)");

orm.toJSON()

const cluster = orm.toValue()
console.log(cluster)