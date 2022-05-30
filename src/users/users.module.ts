import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { MoviesDBService } from '../services/moviesDB.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  providers: [UsersService, MoviesDBService],
  controllers: [UsersController],
})
export class UsersModule {}
