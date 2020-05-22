import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

import CreateUserService from '../../../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  // try {
  const { name, email, password } = req.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.status(201).json({
    message: 'Usuário criado com sucesso!',
    user,
    status: true,
  });
  // } catch (err) {
  //   return res.status(400).json({
  //     message: err.message,
  //     status: false,
  //   });
  // }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    // try {

    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.status(200).json({
      message: 'Avatar atualizado com sucesso!',
      user,
      status: true,
    });
    // } catch (err) {
    //   return res.status(400).json({
    //     message: err.message,
    //     status: false,
    //   });
    // }
  },
);

export default usersRouter;
