import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const { provider_id, date } = req.body;

      // Lógica para caso o middleware
      // altere o tipo da propriedade date, no corpo
      let parsedDate = null;
      if (typeof date === 'string') {
        parsedDate = parseISO(date);
      }

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        date: parsedDate || date,
        provider_id,
        user_id,
      });

      return res.status(200).json({
        message: 'Appointment realizado com sucesso!',
        appointment,
        status: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Problema ao realizar appointment!',
        status: false,
        erro: err.message,
      });
    }
  }
}
