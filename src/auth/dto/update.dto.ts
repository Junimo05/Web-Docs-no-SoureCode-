import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  // @IsString()
  // @IsNotEmpty()
  // username: string;

  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
