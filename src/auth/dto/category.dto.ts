import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image_Cate?: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
