function DatabaseError(statement, message) {
  this.statement = statement
  this.message = message
}

function Parser() {
  const commands = new Map();
  commands.set("createTable", /create table ([a-z]+) \((.+)\)/)
  commands.set("insert", /insert into ([a-z]+) \((.+)\) values \((.+)\)/)
  commands.set("select", /select (.+) from ([a-z]+)(?: where (.+))?(?: and (.+))?/)
  commands.set("delete", /delete from ([a-z]+)(?: where (.+))?(?: and (.+))?/)
  this.parse = function(statement) {
    for (let [command, regexp] of commands) {
      const parsedStatement = statement.match(regexp);
      if (parsedStatement) {
        return { // return dentro do for of equivale a um break retornando o valor
          command,
          parsedStatement
        };
      }
    }
  }
}


const database = {
  tables: {},
  parser: new Parser(),
  createTable(parsedStatement) {
    let [, tableName, columns] = parsedStatement;
    this.tables = {
      [tableName]: {
        columns: {},
        data: []
      }
    }
    columns = columns.split(", ")
    for (let column of columns) {
      const [name, type] = column.trim().split(" ")
      this.tables[tableName].columns[name] = type
    }
  },
  insert(parsedStatement) {
    let [,tableName, columns, values] = parsedStatement;
    columns = columns.split(", ");
    values = values.split(", ");
    if(!this.tables[tableName]) {
      throw new DatabaseError(statement, `Table ${tableName} not found`)
    }
    if(columns.length !== values.length) {
      throw new DatabaseError(statement, "Number of columns and values don't match")
    }
    let row = {};
    for(let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const value = values[i];
      row[column] = value;
    }
    this.tables[tableName].data.push(row);
  },
  select(parsedStatement) {
    let [, columns, tableName, conditions] = parsedStatement;
    columns = columns.split(", ");
    if(conditions) {
      conditions = conditions.split(" and ");
    }
    if(!this.tables[tableName]) {
      throw new DatabaseError(statement, `Table ${tableName} not found`)
    }
    const rows = this.tables[tableName].data.reduce((acc, row) => {
      if(conditions?.length) {
        for(let condition of conditions) {
          const equalsRegexp = /([a-z]+) = '?(.+)'?/;
          const inRegexp = /([a-z]+) in \((.+)\)/;
          if(equalsRegexp.test(condition)) {
            const [column, value] = condition.split(" = ");
            if(row[column] !== value.replace(/^'(.*)'$/, '$1')) {
              return acc;
            }
          } else if (inRegexp.test(condition)) {
            const inRegexp = /([a-z]+) in \((.+)\)/;
            const [, column, values] = condition.match(inRegexp);
            const valuesArray = values.split(",").map(value => value.trim().replace(/^'(.*)'$/, '$1'));
            if(!valuesArray.includes(row[column])) {
              return acc;
            }
          }
        }
      }
      let selectedRow = {};
      if (columns[0] === "*") {
        selectedRow = row;
      } else {
        for(let column of columns) {
          selectedRow[column] = row[column];
        }
      }
      acc.push(selectedRow);
      return acc;
    }, [])
    return rows;
  },
  delete(parsedStatement) {
    let [, tableName, conditions] = parsedStatement;
    const selectStatement = `select id from ${tableName} where ${conditions}`;
    let ids = this.execute(selectStatement);
    if(ids.length) {
      ids = ids.reduce((acc, row) => {
        acc.push(row.id);
        return acc;
      }, []);
      this.tables[tableName].data = this.tables[tableName].data.filter(row => !ids.includes(row.id));
    }
  },
  execute(statement) {
    const result = this.parser.parse(statement);
    if(!result) {
      throw new DatabaseError(statement, "Syntax error")
    }
    return this[result.command](result.parsedStatement)
  }
}

try {
  database.execute("create table author (id number, name string, age number, city string, state string, country string)");
  database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
  database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
  database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
  database.execute("delete from author where id = 2");
  const select = database.execute("select name, age from author");
  console.log(JSON.stringify(select, undefined, " "));
} catch (error) {
  console.log('Error 1 ->', error.message)
}