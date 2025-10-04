import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret',
    });
  }

  // payload: object mà bạn đã sign trong authService.login()
  async validate(payload: any) {
    // payload.sub = user.id
    const user = await this.usersService.findById(payload.sub);
    if (!user) throw new UnauthorizedException();
    const { password, ...result } = user;
    return result; // --> sẽ được gán vào req.user
  }
}
