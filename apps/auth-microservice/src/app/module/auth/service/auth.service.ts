import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entity/user.entity';
import config from '../../../config/config';
import { SignInDto } from '@core/shared/dto';
import { RpcException } from '@nestjs/microservices';

export interface Payload {
  sub: number;
  username?: string;
  email?: string;
  userId?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    console.log("Config Service Auth Micro Service", configService);
  }

  async handleSignIn(body: SignInDto) {
    const { email, password } = body;

    // VALIDATE USER
    const user: any = await this.validateUser(email, password);
    if (!user) { throw new RpcException({ error: 'Invalid credentials', message: 'Invalid credentials', statusCode: 401 }); }

    // GENERATE JWT
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    if (!accessToken || !refreshToken) { throw new RpcException('Failed to generate JWT'); }

    return {
      accessToken,
      refreshToken,
      user
    }
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  generateAccessToken(user: User) {
    const payload: Payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '20d',
      secret: this.configService.accessSecretKey,
    });
  }

  generateRefreshToken(user: User) {
    const payload: Payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '10h',
      secret: this.configService.refreshSecretKey,
    });
  }

  generateJWT(user: User) {
    const payload: Payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async generateAccessTokenByRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.refreshSecretKey,
      });
      const user: any = await this.usersService.findById(payload.sub);
      if (user) {
        const newAccessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);
        return {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
      }

    } catch (error) {
      throw new UnauthorizedException('Invalid');
    }
  }

}
