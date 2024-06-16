import { Document } from './entities';
import { plainToClass } from 'class-transformer';
import { DocumentRequestDto } from './dto';

export class DocumentsMapper {
  static toResponse(document: Document): DocumentRequestDto {
    const attributeFields = document.attributeFields.map((documentField) => {
      let value: string | number;
      const templateField = document.template.attributeFields.find(
        (templateField) => templateField.name === documentField.name,
      );
      if (templateField.type === 'number') {
        value = +documentField.value;
      } else {
        value = documentField.value;
      }
      return { ...documentField, value };
    });
    return plainToClass(DocumentRequestDto, { ...document, attributeFields });
  }
}
