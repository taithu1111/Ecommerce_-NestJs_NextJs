import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3307,
      username: 'root',
      password: '12345678',
      database: 'ecommerce_db',
      autoLoadEntities: true,
      synchronize: true, // Chỉ dùng khi dev
    }),
     CategoriesModule,
     ProductsModule,
     OrdersModule,
     UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

