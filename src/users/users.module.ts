import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserCrudService } from './users.crud.service';
import { UserEntity } from './entities/user.entity';

@Module({
  providers: [
    UsersService,
    UserCrudService,
    {
      provide: 'USER_REPOSITORY',
      useValue: UserEntity,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
