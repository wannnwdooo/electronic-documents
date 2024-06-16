import { IsString, IsIn } from 'class-validator';

export class CreateAttributeFieldDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['string', 'number', 'date'])
  type: 'string' | 'number' | 'date';
}
