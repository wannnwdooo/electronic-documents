import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDocumentFieldDto } from './create-document-field.dto';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentFieldDto)
  @IsOptional()
  attributeFields?: CreateDocumentFieldDto[];
}
