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
  try {
    console.log('[UsersService] create() DTO:', dto);
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashed });
    console.log('[UsersService] After repo.create:', user);
    const savedUser = await this.repo.save(user);
    console.log('[UsersService] After repo.save:', savedUser);
    return savedUser;
  } catch (err) {
     console.error('[UsersService] Error in create():', err);
      throw err;
  }
    
  }  

    findAll() {
    console.log('[UsersService] findAll() called');
    return this.repo.find();
  }

  
  async findOne(id: number) {
    console.log('[UsersService] findOne() id:', id);
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      console.error('[UsersService] User not found, id:', id);
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    console.log('[UsersService] update() id:', id, 'dto:', dto);
    const user = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    const updatedUser = await this.repo.save(user);
    console.log('[UsersService] After update save:', updatedUser);
    return updatedUser;
  }

  async remove(id: number) {
    console.log('[UsersService] remove() id:', id);
    const user = await this.findOne(id);
    const deletedUser = await this.repo.remove(user);
    console.log('[UsersService] After remove:', deletedUser);
    return deletedUser;  }
}
