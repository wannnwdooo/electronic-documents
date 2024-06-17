import { IsString, IsArray, ValidateNested, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';
import { CreateAttributeFieldDto } from './create-attribute-field.dto';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttributeFieldDto)
  @IsNotEmpty()
  attributeFields: CreateAttributeFieldDto[];
}
