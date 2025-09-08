import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Controller('users')
export class UsersController {
      constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        console.log('[UsersController] POST /users - body:', dto);
        return this.usersService.create(dto);
    }
     @Get()
    findAll() {
        console.log('[UsersController] GET /users');
        return this.usersService.findAll();
    }

     @Get(':id')
    findOne(@Param('id') id: string) {
        console.log('[UsersController] GET /users/' + id);
        return this.usersService.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        console.log('[UsersController] PUT /users/' + id, 'body:', dto);
     return this.usersService.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        console.log('[UsersController] DELETE /users/' + id);
        return this.usersService.remove(Number(id));
  }
}
