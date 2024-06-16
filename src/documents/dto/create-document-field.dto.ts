import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDocumentFieldDto {
  @IsString()
  name: string;

  @Transform(({ value }) => value.toString())
  @IsString()
  value: string;
}
