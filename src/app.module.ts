import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutoController } from './cadastro/controllers/produto.controller';
import { ProdutoService } from './cadastro/services/produto.service';
import { ProdutoModel } from './cadastro/models/produto.model';
import { EstoqueModel } from './estoque/models/estoque.model';
import { EstoqueController } from './estoque/controllers/estoque.controller';
import { EstoqueService } from './estoque/services/estoque.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'aula-04',
      models: [ProdutoModel, EstoqueModel, UserEntity],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
      },
    }),
    SequelizeModule.forFeature([ProdutoModel, EstoqueModel, UserEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ProdutoController, EstoqueController],
  providers: [
    ProdutoService,
    EstoqueService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
