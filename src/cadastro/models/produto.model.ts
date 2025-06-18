import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EstoqueModel } from 'src/estoque/models/estoque.model';

@Table({
  tableName: 'produto',
  modelName: 'produto',
})
export class ProdutoModel extends Model {
  @ApiProperty({
    description: 'Nome do produto',
    required: true,
  })
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @ApiProperty({
    description: 'Descrição completa do produto para Nota Fiscal',
    required: false,
  })
  @Column(DataType.TEXT)
  descricao!: string;

  @HasMany(() => EstoqueModel)
  estoques: EstoqueModel[];
}
