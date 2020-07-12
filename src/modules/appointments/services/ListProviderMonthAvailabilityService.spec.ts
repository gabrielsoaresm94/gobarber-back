// Jest mantem problemas com a syntaxe @, no import
import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  // TODO - Resolver esse teste
  it('should be able list month availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 19, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 17, 0, 0),
    });

    // async function criaAppointments(): Promise<void> {
    //   for (let i = 8; i < 17; i += 1) {
    //     fakeAppointmentsRepository.create({
    //       provider_id: 'user',
    //       date: new Date(2020, 7, 20, i, 0, 0),
    //     });
    //   }
    // }

    // await criaAppointments();

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 7,
    });

    console.log(availability);

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});

// { day: 1, available: false },
// { day: 2, available: false },
// { day: 3, available: false },
// { day: 4, available: false },
// { day: 5, available: false },
// { day: 6, available: false },
// { day: 7, available: false },
// { day: 8, available: false },
// { day: 9, available: false },
// { day: 10, available: false },
// { day: 11, available: false },
// { day: 12, available: false },
// { day: 13, available: false },
// { day: 14, available: false },
// { day: 15, available: false },
// { day: 16, available: false },
// { day: 17, available: false },
// { day: 18, available: false },
// { day: 19, available: true },
// { day: 20, available: false },
// { day: 21, available: true },
// { day: 22, available: true },
// { day: 23, available: false },
// { day: 24, available: false },
// { day: 25, available: false },
// { day: 26, available: false },
// { day: 27, available: false },
// { day: 28, available: false },
// { day: 29, available: false },
// { day: 30, available: false },
// { day: 31, available: false },
