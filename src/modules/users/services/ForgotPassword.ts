// import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '../../../shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class ForgotPassword {
  private usersRepository: IUsersRepository;

  private mailProvider: IMailProvider;

  private usersTokensRepository: IUsersTokensRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('MailProvider')
    mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.usersTokensRepository = usersTokensRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    await this.usersTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha.');
  }
}

export default ForgotPassword;
