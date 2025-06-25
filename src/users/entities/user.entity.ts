import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  modelName: 'user',
  tableName: 'user',
})
export class UserEntity extends Model {
  @Column
  username: string;
  @Column
  password: string;
}
