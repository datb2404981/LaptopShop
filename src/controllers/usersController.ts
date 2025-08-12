import { Request, Response } from 'express';
import { getAllUsers } from '../services/users';


const getUsers = async (req: Request, res: Response) => {
  const userList = await getAllUsers();
  return res.render('pages/users',  {usersList: userList});
};

export { getUsers } 