import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTemplateDto } from './dto';
import { Template } from './entities';
import { AbstractTemplatesService } from './templates.interfaces';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: AbstractTemplatesService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto): Promise<Template> {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  findAll(): Promise<Template[]> {
    return this.templatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Template> {
    return this.templatesService.findOne(id);
  }
}
