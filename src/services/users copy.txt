import { getConnection } from "config/database";

const handCreateUsers = async(
  name: string,
  email: string,
  address : string,
) => {
  try {
    //connect database
    const connection = await getConnection();

    const sql = 'INSERT INTO `users`(`name`, `email` ,`address`) VALUES (?, ?, ?)';
    const values = [name,email,address];

    const [result, fields] = await connection.execute(sql, values);
    console.log(`Create User successfuly!`);
    return result;
  } catch (err) {
    console.log(err);
  }
}

const getAllUsers = async () => {
  const users = await getConnection();

  try {
    const [results, fields] = await users.query('SELECT * FROM `users`');
    return results;
  }
  catch (err) {
    console.log(err);
    return [];
  }
};

const getUser = async (id : string) => {
  const connection = await getConnection();

  try {
  const sql = 'SELECT * FROM `users` WHERE `id` = ?';
  const values = [id];

  const [rows, fields] = await connection.execute(sql, values);

  return rows[0];
  } catch (err) {
    console.log(err);
  }

}

const handDeleteUsers = async (id: string)=>{
  const connection = await getConnection();
    try {
    const sql = 'DELETE FROM `users` WHERE `id` = ?';
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);

      return result;
  } catch (err) {
    console.log(err);
  }
}

const handUpdateUsers = async (id : string, name :string, email:string, address:string )=>{
  const connection = await getConnection();
    try {
    const sql = 'UPDATE `users` SET `name` = ?,`email` = ?,`address` = ? WHERE `id` = ?';
    const values = [ name, email, address , id];


    const [result, fields] = await connection.execute(sql, values);

      return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


export { getAllUsers,getUser, handCreateUsers,handDeleteUsers,handUpdateUsers }