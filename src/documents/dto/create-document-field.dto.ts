import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateDocumentFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value.toString())
  @IsString()
  @IsNotEmpty()
  value: string;
}
