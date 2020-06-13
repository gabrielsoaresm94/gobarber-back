import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const listProviders = container.resolve(ListProvidersService);

      const providers = await listProviders.execute({
        user_id,
      });

      return res.status(200).json({
        message: 'Providers listados com sucesso!',
        providers,
        status: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problema ao listar providers!',
        status: true,
        erro: err.message,
      });
    }
  }
}
