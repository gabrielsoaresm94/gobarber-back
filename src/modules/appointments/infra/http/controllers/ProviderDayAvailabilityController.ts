import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { provider_id } = req.params;
      const { day, month, year } = req.body;

      /* Problemas */
      const listProviderDayAvailability = container.resolve(
        ListProviderDayAvailabilityService,
      );

      const availability = await listProviderDayAvailability.execute({
        provider_id,
        day,
        month,
        year,
      });

      return res.status(200).json({
        message: 'Dias listados com sucesso!',
        availability,
        status: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problema ao listar mês!',
        status: true,
        erro: err.message,
      });
    }
  }
}
