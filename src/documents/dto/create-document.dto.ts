import { IsString, IsArray, ValidateNested, IsNumber, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';
import { CreateDocumentFieldDto } from './create-document-field.dto';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentFieldDto)
  @IsNotEmpty()
  attributeFields: CreateDocumentFieldDto[];
}
