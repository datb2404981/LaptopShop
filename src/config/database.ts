import mysql from 'mysql2/promise';  
  
//config database
const getConnection = async() => {
  try {
    //create Database
    const connectMysql = await mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: "123456",
    database: 'nodejspro',
    })
    console.log("Connect DB successfuly!");
    return connectMysql;

  }
  catch (err) {
    console.log(">>> error: ", err);
  }
  
}

export {getConnection}