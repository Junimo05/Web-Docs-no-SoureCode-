import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as agron2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable({})
export class AuthSevice {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    //find user
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    //if user not exist
    if (!user) {
      throw new ForbiddenException('credentials incorrect');
    }
    //compare password
    const passwordMathes = await agron2.verify(user.password, dto.password);
    //if password is not correct
    if (!passwordMathes) {
      throw new ForbiddenException('password is not correct');
    }
    //if login success
    delete user.password;
    const tokenAfterSign = await this.signToken(
      user.username,
      user.email,
      user.role,
    );
    if(tokenAfterSign) {
      return {
        name: user.username,
        role: user.role,
        token: tokenAfterSign
      };
    }
  }

  private async signToken(
    username: string,
    email: string,
    role?: string | 'customer',
  ): Promise<string> {
    const payload: object = {
      username: username,
      email: email,
      role: role,
    };

    const secretKey = this.config.get<string>('key.jwtKey');
    const jwtSign = await this.jwt.signAsync(payload, {
      expiresIn: '300s',
      secret: secretKey,
    });

    return jwtSign;
  }

  async register(dto: AuthDto) {
    //hash password with argon2
    const hash = await agron2.hash(dto.password);

    //save new user with hash password in the database
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        username: dto.username,
        password: hash,
        created_at: new Date(),
        updated_at: new Date(),
        status: 'active',
      },
    });
    return { msg: 'action signup is success with data:', user };
  }

  //test url if it correct
  showDataUser() {
    return 'show data!';
  }
}
