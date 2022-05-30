import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Return all users' })
  getAll() {
    return this.userService.findAll();
  }

  @Get('login')
  @ApiOperation({ summary: 'Return user data' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  removeById(@Param('id') id: string) {
    return this.userService.removeById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Creat new user' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update user data' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
