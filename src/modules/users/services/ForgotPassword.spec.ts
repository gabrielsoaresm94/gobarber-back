import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ForgotPassword from './ForgotPassword';
import UsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: UsersTokensRepository;
let fakeMailProvider: FakeMailProvider;
let forgotPassword: ForgotPassword;

describe('SendForgtPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokensRepository = new UsersTokensRepository();

    forgotPassword = new ForgotPassword(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokensRepository,
    );
  });

  it('should be able send email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    await forgotPassword.execute({
      email: 'mari@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    expect(
      forgotPassword.execute({
        email: 'mari@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    await forgotPassword.execute({
      email: 'mari@mail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
