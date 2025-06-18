import { BadRequestException, Injectable } from '@nestjs/common';
import { ProdutoModel } from '../models/produto.model';
import { ApiProperty } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/sequelize';

export class ProdutoCreatedSuccess {
  @ApiProperty()
  id: number;
}

export class ProdutoResponseError {
  @ApiProperty()
  message: string;
}

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel(ProdutoModel)
    private repository: typeof ProdutoModel,
  ) {}

  async getById(id: string) {
    return this.repository.findByPk(+id);
  }

  getAll() {
    return this.repository.findAll();
  }

  async create(model: ProdutoModel): Promise<{ id: string }> {
    const produtoCreated = await this.repository.create({ ...model });
    return {
      id: `${produtoCreated.id}`,
    };
  }
  async update(id: string, model: ProdutoModel): Promise<{ id: string }> {
    const produto = await this.repository.findByPk(+id);
    if (!produto) {
      throw new BadRequestException('Produto não foi encontrado!');
    }

    produto.dataValues.nome = model.nome;
    produto.dataValues.descricao = model.descricao;
    produto.changed('nome', true);
    produto.changed('descricao', true);
    await produto.save();

    return {
      id: `${id}`,
    };
  }
  async remove(id: string) {
    await this.repository.destroy({ where: { id: +id } });
  }
}
