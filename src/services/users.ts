import { getConnection } from "../config/database";

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

export { getAllUsers, handCreateUsers }