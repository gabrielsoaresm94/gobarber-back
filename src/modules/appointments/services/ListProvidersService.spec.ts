// Jest mantem problemas com a syntaxe @, no import
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Laura',
      email: 'laura@mail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@mail.com',
      password: 'senhaforte',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
