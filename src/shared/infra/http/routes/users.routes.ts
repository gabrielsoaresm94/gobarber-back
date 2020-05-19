import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';
import UpdateUserAvatarService from '../../../../modules/users/services/UpdateUserAvatarService';

import CreateUserService from '../../../../modules/users/services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  // try {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

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
    const updateUserAvatar = new UpdateUserAvatarService();

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
