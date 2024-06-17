import { IsString, IsIn, IsNotEmpty } from "class-validator";

export class CreateAttributeFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['string', 'number', 'date'])
  type: 'string' | 'number' | 'date';
}
