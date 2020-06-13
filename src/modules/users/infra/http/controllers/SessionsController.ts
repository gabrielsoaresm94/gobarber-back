import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      delete user.password;

      return res.status(200).json({
        message: 'Autenticação completa!',
        user,
        token,
        status: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas na autenticaação!',
        status: false,
        erro: err.message,
      });
    }
  }
}
