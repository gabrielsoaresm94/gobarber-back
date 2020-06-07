import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Laura',
      email: 'laura@email.com',
    });

    expect(updatedUser.name).toBe('Laura');
    expect(updatedUser.email).toBe('laura@email.com');
  });

  it('should not be able to change email with email from another user', async () => {
    await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Laura',
      email: 'laura@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mari',
        email: 'mari@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Laura',
      email: 'laura@email.com',
      old_password: '123456',
      password: 'senhaforte',
    });

    expect(updatedUser.password).toBe('senhaforte');
  });

  it('should not be able update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Laura',
        email: 'laura@email.com',
        password: 'senhaforte',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mari',
      email: 'mari@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Laura',
        email: 'laura@email.com',
        old_password: 'outrasenha',
        password: 'senhaforte',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'non-existing',
        email: 'non-existing@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
