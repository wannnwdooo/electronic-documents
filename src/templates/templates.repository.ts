import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from './entities';
import { DeepPartial, Repository } from 'typeorm';
import { AbstractTemplatesRepository } from './templates.interfaces';

@Injectable()
export class TemplatesRepository implements AbstractTemplatesRepository {
  constructor(
    @InjectRepository(Template)
    private readonly templatesRepository: Repository<Template>,
  ) {}

  async create(dto: DeepPartial<Template>): Promise<Template> {
    const template = this.templatesRepository.create(dto);
    return this.templatesRepository.save(template);
  }
  async findAll(): Promise<Template[]> {
    return this.templatesRepository.find({ relations: ['attributeFields'] });
  }
  async findOne(id: number): Promise<Template> {
    const template = await this.templatesRepository.findOne({
      where: { id },
      relations: ['attributeFields'],
    });
    if (!template) {
      throw new BadRequestException('Template not found');
    }
    return template;
  }
}
