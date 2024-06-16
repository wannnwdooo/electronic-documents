import { DeepPartial } from 'typeorm';
import { Document, DocumentField } from './entities';
import { Template } from '../templates/entities';

export abstract class AbstractDocumentsRepository {
  abstract create(dto: DeepPartial<Document>): Promise<Document>;
  abstract findAll(): Promise<Document[]>;
  abstract findOne(id: number): Promise<Document>;
  abstract update(document: DeepPartial<Document>): Promise<Document>;
  abstract remove(id: number): Promise<void>;
}

export abstract class AbstractDocumentsService {
  abstract create(dto: DeepPartial<Document>): Promise<Document>;
  abstract findAll(): Promise<Document[]>;
  abstract findOne(id: number): Promise<Document>;
  abstract update(
    id: number,
    document: DeepPartial<Document>,
  ): Promise<Document>;
  abstract remove(id: number): Promise<void>;
}

export type DocumentResponse = {
  id: number;
  name: string;
  template: Omit<Template, 'attributeFields'>;
  attributeFields: DocumentField[];
};
export type DocumentResponseList = DocumentResponse[];
