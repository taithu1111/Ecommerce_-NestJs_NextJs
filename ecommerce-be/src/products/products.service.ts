import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';

@Injectable()
export class ProductsService {
      constructor(@InjectRepository(Product) private repo: Repository<Product>) {}


  create(dto: CreateProductDto) {
    const p = this.repo.create(dto as any);
    return this.repo.save(p);
  }    

findAll(page = 1, limit = 10) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async update(id: number, dto: UpdateProductDto) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    return this.repo.remove(p);
  }
}
