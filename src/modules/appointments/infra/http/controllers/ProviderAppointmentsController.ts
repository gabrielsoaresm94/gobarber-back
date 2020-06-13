import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const provider_id = req.user.id;
      const { day, month, year } = req.body;

      const listProvidersAppointments = container.resolve(
        ListProvidersAppointmentsService,
      );

      const appointment = await listProvidersAppointments.execute({
        provider_id,
        day,
        month,
        year,
      });

      return res.status(200).json({
        message: 'Appointments listados com sucesso!',
        appointment,
        status: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas ao listar appointments!',
        status: false,
        erro: err.message,
      });
    }
  }
}
