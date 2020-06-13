import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

console.log('Ate aqui vai 1');
export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    console.log('Ate aqui vai 2');
    try {
      console.log('Ate aqui vai 3');
      const { provider_id } = req.params;
      const { month, year } = req.body;

      console.log('Ate aqui vai 4');
      // Problema
      const listProviderMonthAvailability = container.resolve(
        ListProviderMonthAvailabilityService,
      );

      console.log('Ate aqui vai 5');
      const availability = await listProviderMonthAvailability.execute({
        provider_id,
        month,
        year,
      });
      console.log('Ate aqui vai 6');
      return res.status(200).json({
        message: 'Providers, por mês, listados com sucesso!',
        availability,
        status: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Problema ao listar providers',
        status: true,
        erro: err.message,
      });
    }
  }
}

// import { Request, Response } from 'express';
// import { container } from 'tsyringe';

// import ListProvidersService from '@modules/appointments/services/ListProvidersService';
// import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

// export default class ProviderMonthAvailabilityController {
//   public async index(req: Request, res: Response): Promise<Response> {
//     // const user_id = req.user.id;
//     const { provider_id } = req.params;
//     const { month, year } = req.body;

//     const listProviders = container.resolve(
//       ListProviderMonthAvailabilityService,
//     );

//     const providers = await listProviders.execute({
//       provider_id,
//       month,
//       year,
//     });

//     return res.status(200).json({
//       message: 'Providers listados com sucesso!',
//       providers,
//       status: true,
//     });

//     // console.log('Ate aqui vai 3');
//     // const { provider_id } = req.params;
//     // const { month, year } = req.body;

//     // console.log('Ate aqui vai 4');
//     // // Problema
//     // const listProviderMonthAvailability = container.resolve(
//     //   ListProviderMonthAvailabilityService,
//     // );

//     // console.log('Ate aqui vai 5');
//     // const availability = await listProviderMonthAvailability.execute({
//     // provider_id,
//     // month,
//     // year,
//     // });
//     // console.log('Ate aqui vai 6');
//     // return res.status(200).json({
//     //   message: 'Providers, por mês, listados com sucesso!',
//     //   availability,
//     //   status: true,
//     // });
//   }
// }
