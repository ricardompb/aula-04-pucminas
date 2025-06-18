import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EstoqueService } from '../services/estoque.service';
import { ApiProperty } from '@nestjs/swagger';

class DadosCompra {
  @ApiProperty()
  produtoId: number;
  @ApiProperty()
  quantidade: number;
}

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get(':produtoId')
  getSaldoEstoque(@Param('produtoId') produtoId: string) {
    return this.estoqueService.getSaldoEstoque(produtoId);
  }

  @Get('/movimentacao/:produtoId')
  getMovimentacoes(@Param('produtoId') produtoId: string) {
    return this.estoqueService.movimentacoes(produtoId);
  }

  @Post('/comprar/:produtoId')
  comprarProduto(@Body() dadosCompra: DadosCompra) {
    return this.estoqueService.comprar(dadosCompra);
  }

  @Post('/vender/:produtoId')
  vendaProduto(@Body() dadosCompra: DadosCompra) {
    return this.estoqueService.vender(dadosCompra);
  }
}
