import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const provider_id = req.user.id;
      // const { day, month, year } = req.query;

      const day = Number(req.query.day);
      const month = Number(req.query.month);
      const year = Number(req.query.year);

      const listProvidersAppointments = container.resolve(
        ListProvidersAppointmentsService,
      );

      const appointments = await listProvidersAppointments.execute({
        provider_id,
        day,
        month,
        year,
      });

      return res.status(200).json({
        message: 'Agendamentos listados com sucesso!',
        status: true,
        metadata: appointments,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problemas ao listar agendamentos!',
        status: false,
        erro: err.message,
      });
    }
  }
}
