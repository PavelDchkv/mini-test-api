import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSafeData } from './users.interfaces';
import { MoviesDBService } from '../services/moviesDB.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private moviesDBService: MoviesDBService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneById(id: number): Promise<UserSafeData> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.safeUser(user);
  }

  async login({ email, password }: LoginUserDto): Promise<UserSafeData> {
    const user = await this.usersRepository.findOne({ email });
    if (!user)
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );

    if (await bcrypt.compare(password, user.password)) {
      return this.safeUser(user);
    } else {
      throw new HttpException(
        { message: 'Email or password are not correct' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async removeById(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    delete user.password;
    delete user.created;

    const updatedUser = { ...user, ...updateUserDto };
    return await this.usersRepository.save(updatedUser);
  }

  async create({
    username,
    email,
    password,
    tariff,
    firstName,
    lastName,
  }: CreateUserDto): Promise<UserSafeData> {
    const anotherUser = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne();

    if (anotherUser)
      throw new HttpException(
        { message: 'Username and email must be unique' },
        HttpStatus.BAD_REQUEST,
      );

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.tariff = tariff;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = hash;

    const validateErr = await validate(newUser);
    if (validateErr.length > 0)
      throw new HttpException(
        { message: 'Invalid data' },
        HttpStatus.BAD_REQUEST,
      );

    newUser.guestSessionId = await this.moviesDBService.getSessionId();

    if (!newUser.guestSessionId)
      throw new HttpException(
        { message: 'Kakie-to trablya with MoviesDB =( Unlucky' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    await this.usersRepository.save(newUser);
    return this.safeUser(newUser);
  }

  private safeUser({ password, ...updUser }: User): UserSafeData {
    return updUser;
  }
}
