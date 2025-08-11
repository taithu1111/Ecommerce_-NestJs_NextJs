import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import bcrypt from 'node_modules/bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Injectable()
export class UsersService {
      constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}

async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashed });
    return this.repo.save(user);
  }  

    findAll() {
    return this.repo.find();
  }

  
  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

    async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(user, dto);
    return this.repo.save(user);
  }

    async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
