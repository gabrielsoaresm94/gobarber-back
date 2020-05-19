import { Router } from 'express';
import AuthenticateUserService from '../../../../modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  // try {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.status(200).json({
    message: 'Autenticação completa!',
    user,
    token,
    status: true,
  });
  // } catch (err) {
  //   return res.status(400).json({
  //     message: err.message,
  //     status: false,
  //   });
  // }
});

export default sessionsRouter;
