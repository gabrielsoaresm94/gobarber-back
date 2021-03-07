import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const showProfile = container.resolve(ShowProfileService);

      const user = await showProfile.execute({ user_id });

      return res.status(200).json({
        message: 'Perfil encontrado com sucesso',
        status: true,
        metadata: classToClass(user),
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas para encontrar perfil!',
        status: false,
        erro: err.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const { name, email, old_password, password } = req.body;

      const updateProfile = container.resolve(UpdateProfileService);

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      return res.status(201).json({
        message: 'Perfil atualizado com sucesso!',
        status: true,
        metadata: classToClass(user),
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas para atualizar perfil!',
        status: false,
        erro: err.message,
      });
    }
  }
}
