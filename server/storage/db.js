const oracledb = require("oracledb");
const { connectionInfo } = require("./dbConfigs");

oracledb.autoCommit = true;

async function runSQL(statement, binds) {
  let connection;

  try {
    connection = await oracledb.getConnection(connectionInfo);

    let result;

    if (!binds) {
      result = await connection.execute(statement);
    } else {
      result = await connection.execute(statement, binds);
    }

    return result.rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = { runSQL };
