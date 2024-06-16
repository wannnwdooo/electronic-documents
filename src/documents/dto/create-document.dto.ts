import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDocumentFieldDto } from './create-document-field.dto';

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsNumber()
  templateId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentFieldDto)
  attributeFields: CreateDocumentFieldDto[];
}
