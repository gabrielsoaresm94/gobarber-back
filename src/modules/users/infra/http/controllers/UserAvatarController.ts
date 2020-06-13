import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      delete user.password;

      return res.status(200).json({
        message: 'Avatar atualizado com sucesso!',
        user,
        status: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas para atualizar avatar!',
        status: false,
        erro: err.message,
      });
    }
  }
}
