import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      delete user.password;

      return res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user,
        status: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas ao criar usuário!',
        status: true,
        erro: err.message,
      });
    }
  }
}
