import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { provider_id } = req.params;
      const { month, year } = req.body;

      /* Problemas */
      const listProviderMonthAvailability = container.resolve(
        ListProviderMonthAvailabilityService,
      );

      const availability = await listProviderMonthAvailability.execute({
        provider_id,
        month,
        year,
      });

      return res.status(200).json({
        message: 'Mês listado com sucesso!',
        status: true,
        metadata: availability,
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
