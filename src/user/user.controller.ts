import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto, UpdateDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';

// import { Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  //get all user
  @Get('all')
  getAllUser(): Promise<User[]> {
    return this.service.GetAllUser();
  }

  //handle update user
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDto, @GetUser() user: Request) {
    return await this.service.UpdateUser(+id, dto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: Request) {
    return await this.service.DeleteUser(id, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@GetUser() user: Request) {
    return user;
  }
}
