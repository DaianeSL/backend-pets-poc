import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { AuthGuard } from 'src/auth/Auth.guard';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);

    if (!findUser) throw new HttpException('User not found', 404);

    return findUser;
  }

  @Patch('/:id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const updated = await this.usersService.updateUser(id, updateUserDto);

    if (!updated) throw new HttpException('User not found', 404);

    return updated;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.usersService.deleteUser(id);

    if (!deleted) throw new HttpException('User not found', 404);

    return deleted;
  }
}
