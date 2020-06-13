import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPassword from '@modules/users/services/ForgotPassword';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const sendForgotPasswordEmail = container.resolve(ForgotPassword);

      await sendForgotPasswordEmail.execute({
        email,
      });

      return res.status(204).json();
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas ao enviar email de recuperação de senha!',
        status: false,
        erro: err.message,
      });
    }
  }
}
