import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { AttributeField, Template } from './entities';
import {
  AbstractTemplatesRepository,
  AbstractTemplatesService,
} from './templates.interfaces';
import { TemplatesRepository } from './templates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Template, AttributeField])],
  controllers: [TemplatesController],
  providers: [
    { provide: AbstractTemplatesService, useClass: TemplatesService },
    { provide: AbstractTemplatesRepository, useClass: TemplatesRepository },
  ],
  exports: [{ provide: AbstractTemplatesService, useClass: TemplatesService }],
})
export class TemplatesModule {}
