import IParceMailTemplateDTO from '../dtos/IParceMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParceMailTemplateDTO): Promise<string>;
}
