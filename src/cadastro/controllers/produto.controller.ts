import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { ProdutoModel } from '../models/produto.model';
import {
  ProdutoService,
  ProdutoCreatedSuccess,
  ProdutoResponseError,
} from '../services/produto.service';

class ProdutoResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Lista pelo ID',
    description: 'Lista um produto pelo seu identificador',
  })
  @ApiOkResponse({
    type: ProdutoResponse,
  })
  getById(@Param('id') id: string) {
    return this.produtoService.getById(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista de produto',
    description: 'Lista todos os produtos',
  })
  @ApiOkResponse({
    type: ProdutoResponse,
    isArray: true,
  })
  getAll() {
    return this.produtoService.getAll();
  }

  @Post()
  @ApiCreatedResponse({
    type: ProdutoCreatedSuccess,
  })
  @ApiBadRequestResponse({
    type: ProdutoResponseError,
  })
  async create(@Body() model: ProdutoModel): Promise<void> {
    await this.produtoService.create(model);
  }

  @Put(':id')
  @ApiOkResponse({
    type: ProdutoCreatedSuccess,
  })
  @ApiBadRequestResponse({
    type: ProdutoResponseError,
  })
  async update(
    @Param('id') id: string,
    @Body() model: ProdutoModel,
  ): Promise<void> {
    await this.produtoService.update(id, model);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async delete(@Param('id') id: string) {
    await this.produtoService.remove(id);
  }
}
