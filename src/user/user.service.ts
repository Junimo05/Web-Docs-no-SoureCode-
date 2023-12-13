import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async UpdateUser(id: number, dto: UpdateDto, token: any) {

    if(token.role === this.config.get('SUPPER_PERMISSIONS')){
      return await this.prisma.user.update({
        where: { id_User: id },
        data: dto,
      });
    }
    else {
      try {
        const uname = String(token.username);
        const user = await this.prisma.user.findFirst({
          where: {
            id_User: id,
            username: uname
          },
        });
        if (!user) {
          return {
            msg: 'can not update user with infomation token'
          }
        }
        //check if old password not equal new password
        const passwordMathes: boolean = await argon2.verify(
          user.password,
          dto.oldPassword,
        );
        if (!passwordMathes) {
          return {
            msg: 'old password not match'
          }
        }
        //check if user exist and old password is correct
        if (user && passwordMathes) {
          const hash = await argon2.hash(dto.newPassword);
          const update = await this.prisma.user.update({
            where: {
              id_User: id,
              username: uname
            },
            data: {
              password: hash,
            },
          });
          return update;
        }
      } catch (error) {
        throw new ForbiddenException('invalid!');
      }
    }
    // check if new password equal old password
    
  }

  async DeleteUser(id: string, user: any) {
    const idDelete = Number(id);
    const uname = String(user.username);
    
    if (user.role === this.config.get('SUPPER_PERMISSIONS')) {
      try {
        const deleteUser = await this.prisma.user.delete({
          where: {
            id_User: idDelete,
          },
        });
        return deleteUser;
      } catch (error) {
          throw new Error('invalid your role admin can not enough permissions');
      }
    }
    else {
      try {
        const user = await this.prisma.user.findUnique({
          where: {      
              id_User: idDelete,
              username: uname,
          },
        });
        if (user) {
          const deleteUser = await this.prisma.user.delete({
            where: {
              id_User: idDelete,
            },
          });
          return deleteUser;
        }
        else {
          return {
            msg: 'user not found',
          }
        }
      } catch (error) {
        throw new ForbiddenException('invalid!, can not delete user');
      }
    }
  }

  async GetAllUser() {
    return await this.prisma.user.findMany();
  }

}
