import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity/product.entity';
import { Category } from 'src/categories/category.entity/category.entity';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, Category])],
  exports: [ProductsService]
})
export class ProductsModule {}
