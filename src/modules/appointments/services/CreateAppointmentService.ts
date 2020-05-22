import { startOfHour } from 'date-fns';

import AppError from '../../../shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(appointmentsRepository: IAppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('Este appointment já está reservado!');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Metodo create já salva
    // await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
