import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import {
  CreateDocumentDto,
  CreateDocumentFieldDto,
  UpdateDocumentDto,
} from './dto';
import { Document, DocumentField } from './entities';
import { AttributeField } from '../templates/entities';
import { AbstractTemplatesService } from '../templates/templates.interfaces';
import {
  AbstractDocumentsRepository,
  AbstractDocumentsService,
} from './documents.interfaces';

@Injectable()
export class DocumentsService implements AbstractDocumentsService {
  constructor(
    private readonly documentsRepository: AbstractDocumentsRepository,
    private readonly templatesService: AbstractTemplatesService,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const template = await this.templatesService.findOne(
      createDocumentDto.templateId,
    );

    const attributeFields = createDocumentDto.attributeFields;

    this.validateFields(template.attributeFields, attributeFields);

    return this.documentsRepository.create({
      ...createDocumentDto,
      template,
    });
  }

  async findAll(): Promise<Document[]> {
    return this.documentsRepository.findAll();
  }

  async findOne(id: number): Promise<Document> {
    return this.documentsRepository.findOne(id);
  }

  async update(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.findOne(id);
    const template = document.template;

    if (updateDocumentDto.attributeFields) {
      this.validateFields(
        template.attributeFields,
        updateDocumentDto.attributeFields,
        true,
      );

      document.attributeFields = this.updateDocumentFields(
        document.attributeFields,
        updateDocumentDto.attributeFields,
      );
    }

    if (updateDocumentDto.name) {
      document.name = updateDocumentDto.name;
    }

    return this.documentsRepository.update(document);
  }

  async remove(id: number): Promise<void> {
    await this.documentsRepository.remove(id);
  }

  private validateFields(
    templateFields: AttributeField[],
    documentFields: DeepPartial<DocumentField>[],
    skipLengthCheck: boolean = false,
  ): void {
    if (!skipLengthCheck && templateFields.length !== documentFields.length) {
      throw new BadRequestException('Invalid fields for the given template');
    }

    for (const templateField of templateFields) {
      const documentField = documentFields.find(
        (field) => field.name === templateField.name,
      );

      if (!documentField) {
        if (!skipLengthCheck) {
          throw new BadRequestException(
            `Field ${templateField.name} is missing`,
          );
        }
        continue;
      }
      const typeChecker = this.typeChecking(documentField.value)[
        templateField.type
      ];
      if (!typeChecker) {
        throw new BadRequestException(
          `Field ${templateField.name} must be a ${templateField.type}`,
        );
      }
    }
  }

  private typeChecking(fieldValue: string) {
    return {
      string: typeof fieldValue === 'string',
      number: !isNaN(Number(fieldValue)),
      date: !isNaN(Date.parse(fieldValue)),
    };
  }

  private updateDocumentFields(
    existingFields: DocumentField[],
    newFields: CreateDocumentFieldDto[],
  ): DocumentField[] {
    return existingFields.map((existingField) => {
      const updatedField = newFields.find(
        (field) => field.name === existingField.name,
      );
      return updatedField
        ? { ...existingField, value: updatedField.value }
        : existingField;
    });
  }
}
