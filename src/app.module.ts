import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutoController } from './cadastro/controllers/produto.controller';
import { ProdutoService } from './cadastro/services/produto.service';
import { ProdutoModel } from './cadastro/models/produto.model';
import { EstoqueModel } from './estoque/models/estoque.model';
import { EstoqueController } from './estoque/controllers/estoque.controller';
import { EstoqueService } from './estoque/services/estoque.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'aula-04',
      models: [ProdutoModel, EstoqueModel],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([ProdutoModel, EstoqueModel]),
  ],
  controllers: [ProdutoController, EstoqueController],
  providers: [ProdutoService, EstoqueService],
})
export class AppModule {}
