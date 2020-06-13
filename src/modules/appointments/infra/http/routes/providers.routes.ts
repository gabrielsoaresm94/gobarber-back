import { Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();

// console.log('Ate aqui vai 1');
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
// console.log('Ate aqui vai 2');

const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

// console.log('Ate aqui vai 3');
providersRouter.post(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

providersRouter.post(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
