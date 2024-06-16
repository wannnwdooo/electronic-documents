import { DeepPartial } from 'typeorm';
import { Template } from './entities';

export abstract class AbstractTemplatesRepository {
  abstract create(dto: DeepPartial<Template>): Promise<Template>;
  abstract findAll(): Promise<Template[]>;
  abstract findOne(id: number): Promise<Template>;
}

export abstract class AbstractTemplatesService extends AbstractTemplatesRepository {}
