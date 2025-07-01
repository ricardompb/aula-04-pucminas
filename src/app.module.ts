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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [ProdutoModel, EstoqueModel, UserEntity],
        autoLoadModels: true,
        synchronize: true,
        sync: { alter: true },
      }),
      inject: [ConfigService],
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
