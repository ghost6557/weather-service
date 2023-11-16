import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Actions } from './entities/actions.entity';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Actions])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
