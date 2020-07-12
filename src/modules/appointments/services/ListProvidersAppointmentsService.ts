import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProvidersAppointmentsService {
  // Trocar para plural
  private appointmentRepository: IAppointmentsRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('AppointmentsRepository')
    appointmentRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}:${month}:${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    // let appointments;

    if (!appointments) {
      appointments = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
      });

      await this.cacheProvider.save(cacheKey, classToClass(appointments)); // Salva appointments no cache de forma serializada
    }

    return appointments;
  }
}

export default ListProvidersAppointmentsService;
