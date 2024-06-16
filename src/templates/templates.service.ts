import { Injectable } from '@nestjs/common';
import { Template } from './entities';
import { CreateTemplateDto } from './dto';
import {
  AbstractTemplatesRepository,
  AbstractTemplatesService,
} from './templates.interfaces';

@Injectable()
export class TemplatesService implements AbstractTemplatesService {
  constructor(
    private readonly templatesRepository: AbstractTemplatesRepository,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    return this.templatesRepository.create(createTemplateDto);
  }

  async findAll(): Promise<Template[]> {
    return this.templatesRepository.findAll();
  }

  async findOne(id: number): Promise<Template> {
    return this.templatesRepository.findOne(id);
  }
}
