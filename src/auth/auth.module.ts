import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthSevice } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
dotenv.config();
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '300',
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthSevice, JwtStrategy],
})
export class authModule {}
