import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserCrudService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof UserEntity,
  ) {}

  getById(id: string) {
    return this.userRepository.findByPk(+id);
  }
  getAll() {
    return this.userRepository.findAll();
  }
  async create(payload: { username: string; password: string }) {
    return this.userRepository.create({
      username: payload.username,
      password: await bcrypt.hash(payload.password, saltOrRounds),
    });
  }
  async update(id: string, payload: { password: string }) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error('user não encontrado');
    }

    if (payload.password !== user.dataValues.password) {
      user.dataValues.password = await bcrypt.hash(
        payload.password,
        saltOrRounds,
      );
      await user.save();
    }
  }
  delete(id: string) {
    return this.userRepository.destroy({ where: { id: +id } });
  }
}
