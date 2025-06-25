import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof UserEntity,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      raw: true,
    });
    if (!user) {
      throw new Error('username não encontrado.');
    }
    return user;
  }
}
