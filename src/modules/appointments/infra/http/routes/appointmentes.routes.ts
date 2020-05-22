import { Router } from 'express';
// import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

// Ficar de olho '-'
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointment = await appointmentsRepository.find();

//   return res.status(200).json({
//     message: 'Lista todos os appointments!',
//     appointment,
//     status: true,
//   });
// });

appointmentsRouter.post('/', async (req, res) => {
  // try {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.status(200).json({
    message: 'Appointment realizado com sucesso!',
    appointment,
    status: true,
  });
  // } catch (err) {
  //   return res.status(400).json({
  //     message: err.message,
  //     status: false,
  //   });
  // }
});

export default appointmentsRouter;
