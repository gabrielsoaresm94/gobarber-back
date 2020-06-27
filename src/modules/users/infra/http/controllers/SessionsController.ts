import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

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

      return res.status(200).json({
        message: 'Autenticação completa!',
        status: true,
        metadata: {
          user: classToClass(user),
          token,
        },
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
