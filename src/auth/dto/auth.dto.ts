import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  userid: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  created_at: string;

  updated_at: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  role: string;

  status: string;
}
