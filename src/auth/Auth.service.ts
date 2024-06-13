import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/RefreshToken.dto';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.getUserByUsername(signInDto.username);

    if (user != null && user.password === signInDto.password) {
      const newTokens = this.generateTokens(user._id, user.username);

      return newTokens;
    }

    throw new UnauthorizedException();
  }

  async refresh(
    RefreshTokenDto: RefreshTokenDto,
  ): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(RefreshTokenDto.refreshToken);

      const user = await this.userService.getUserById(payload.id);

      if (user.username !== payload.username) {
        throw new UnauthorizedException('Invalid refresh token user');
      }

      const newToken = await this.jwtService.signAsync(payload, {
        expiresIn: '5m',
      });

      return { access_token: newToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(
    userid: mongoose.Types.ObjectId,
    username: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { id: userid, username: username };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
    });

    return {
      access_token: token,
      refresh_token: refreshToken,
    };
  }
}
