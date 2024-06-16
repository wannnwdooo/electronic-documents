import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAttributeFieldDto } from './create-attribute-field.dto';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttributeFieldDto)
  attributeFields: CreateAttributeFieldDto[];
}
