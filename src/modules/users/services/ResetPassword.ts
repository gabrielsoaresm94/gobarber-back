// import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { differenceInHours, getHours } from 'date-fns';

// import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '../../../shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  private usersRepository: IUsersRepository;

  private usersTokensRepository: IUsersTokensRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;

    this.usersTokensRepository = usersTokensRepository;

    this.hashProvider = hashProvider;
  }

  public async timeNow(): Promise<number> {
    const getTheHour: Date = new Date(Date.now());

    return getHours(getTheHour);
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);
    console.log(userToken);

    if (!userToken) {
      throw new AppError('Token não existe');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    const tokenCreatedAt: Date = userToken.created_at;
    const getTimeNow = await this.timeNow();

    console.log(getTimeNow);
    console.log(getHours(tokenCreatedAt));
    // console.log(getTimeNow * 3600000);
    // console.log(getHours(tokenCreatedAt) * 3600000);
    console.log(
      differenceInHours(
        getTimeNow * 3600000,
        getHours(tokenCreatedAt) * 3600000,
      ),
      // > 2,
    );

    /* Comentado até resolver o problema da data no Postgres */
    // if (
    //   differenceInHours(
    //     getTimeNow * 3600000,
    //     getHours(tokenCreatedAt) * 3600000,
    //   ) > 2
    // ) {
    //   throw new AppError('Token expirado');
    // }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
