import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import e from 'express';
import { access } from 'fs';
import bcrypt from 'node_modules/bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService : JwtService) {}
    
    //validate credential
    async validateUser(email: string, pass: string)
    {
        const user = await this.userService.findByEmail(email);
        if(!user) return null;
        const matched = await bcrypt.compare(pass, user.password);
        if(!matched) return null;
        const { password, ...result} = user;
        return result;
    }

    //create jwt token
    async login(user: any)
    {
        const payload = { email: user.email, sub: user.id, roles: user.roles };
        return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, roles: user.roles}
        };  
    }

        //register: hash password then save 
    async register(dto: {email: string, password: string, name:string, roles?: string[]}){
        const existing = await this.userService.findByEmail(dto.email);
        if(existing) throw new UnauthorizedException('Email already in use');
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.userService.create({
            email: dto.email,
            password: hashed,
            name: dto.name,
         });
        const { password, ...result} = user;
        return result;

    }
}
