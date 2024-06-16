import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document, DocumentField } from './entities';
import { TemplatesModule } from '../templates/templates.module';
import {
  AbstractDocumentsRepository,
  AbstractDocumentsService,
} from './documents.interfaces';
import { DocumentsRepository } from './documents.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, DocumentField]),
    TemplatesModule,
  ],
  controllers: [DocumentsController],
  providers: [
    { provide: AbstractDocumentsService, useClass: DocumentsService },
    { provide: AbstractDocumentsRepository, useClass: DocumentsRepository },
  ],
})
export class DocumentsModule {}
