// import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email já está sendo usado!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
