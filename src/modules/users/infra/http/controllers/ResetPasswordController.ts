import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPassword from '@modules/users/services/ResetPassword';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const sendResetPasswordEmail = container.resolve(ResetPassword);

    await sendResetPasswordEmail.execute({
      token,
      password,
    });

    return res.status(204).json();
  }
}
