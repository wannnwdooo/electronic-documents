import { Template } from 'src/templates/entities';
import { Document, DocumentField } from '../entities';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class DocumentRequestDto implements Document {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @Transform(({ value }: { value: Template }) => ({
    id: value.id,
    name: value.name,
  }))
  template: Template;

  @IsArray()
  attributeFields: DocumentField[];
}
