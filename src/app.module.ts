import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-99-81-137-11.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'fzxthtviegftdg',
      password:
        'bab70ffe0141cbddb1099c943815e07988356bba78caa61b2e9eda06189004d9',
      database: 'd13pnfm2sv2vko',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
