import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { ProdutoModel } from 'src/cadastro/models/produto.model';

@Table({
  tableName: 'estoque',
  modelName: 'estoque',
})
export class EstoqueModel extends Model {
  @Column
  quantidade: number;
  @Column
  descricao: string;

  @ForeignKey(() => ProdutoModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  produtoId: number;

  @BelongsTo(() => ProdutoModel, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  produto: ProdutoModel;

  @Column({
    type: DataType.ENUM('ENTRADA', 'SAIDA'),
    allowNull: false,
  })
  tipoMovimentacao: 'ENTRADA' | 'SAIDA';
}
