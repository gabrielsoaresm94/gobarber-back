// import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { getHours } from 'date-fns';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
// import ForgotPassword from './ForgotPassword';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import ResetPasswordService from './ResetPassword';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgtPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: 'senhaforte',
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('senhaforte');
    expect(updateUser?.password).toBe('senhaforte');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: 'senhaforte',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: 'senhaforte',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than  2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    // const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    // jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    //   const customDate = new Date();

    //   return customDate.setDate(customDate.getHours() + 3);
    // });

    jest.spyOn(resetPassword, 'timeNow').mockImplementation(
      async (): Promise<number> => {
        const getTheHour: Date = new Date(Date.now());

        return getHours(getTheHour) + 3;
      },
    );

    await expect(
      resetPassword.execute({
        password: 'senhaforte',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);

    // const updateUser = await fakeUsersRepository.findById(user.id);

    // expect(generateHash).toBeCalledWith('senhaforte');
    // expect(updateUser?.password).toBe('senhaforte');
  });
});
