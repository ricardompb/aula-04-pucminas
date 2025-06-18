import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EstoqueModel } from '../models/estoque.model';
import { ProdutoModel } from 'src/cadastro/models/produto.model';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectModel(EstoqueModel)
    private estoqueRepository: typeof EstoqueModel,
    @InjectModel(ProdutoModel)
    private produtoRepository: typeof ProdutoModel,
  ) {}

  async movimentacoes(produtoId: string) {
    return this.estoqueRepository.findAll({
      where: {
        produtoId: +produtoId,
      },
    });
  }

  async getSaldoEstoque(produtoId: string) {
    const produto = await this.produtoRepository.findByPk(+produtoId);

    if (!produto) {
      throw new BadRequestException('Produto não encontrado');
    }

    const entradas = await this.estoqueRepository.findAll({
      where: {
        produtoId: +produtoId,
        tipoMovimentacao: 'ENTRADA',
      },
    });

    const saidas = await this.estoqueRepository.findAll({
      where: {
        produtoId: +produtoId,
        tipoMovimentacao: 'SAIDA',
      },
    });

    const totalEntrada: number = entradas
      .map((x) => x.dataValues.quantidade)
      .reduce((acc, val) => acc + val, 0);

    const totalSaida: number = saidas
      .map((x) => x.dataValues.quantidade)
      .reduce((acc, val) => acc + val, 0);

    return {
      saldo: totalEntrada - totalSaida,
      produto: produto?.dataValues.nome,
    };
  }

  async comprar(payload: { produtoId: number; quantidade: number }) {
    await this.estoqueRepository.create({
      produtoId: payload.produtoId,
      quantidade: payload.quantidade,
      tipoMovimentacao: 'ENTRADA',
      descricao: 'Compra de mercadoria',
    });
  }

  async vender(payload: { produtoId: number; quantidade: number }) {
    await this.estoqueRepository.create({
      produtoId: payload.produtoId,
      quantidade: payload.quantidade,
      tipoMovimentacao: 'SAIDA',
      descricao: 'Venda de mercadoria',
    });
  }
}
