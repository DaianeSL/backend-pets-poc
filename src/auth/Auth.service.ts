import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/SignIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByUsername(signInDto.username);

    if (user != null && user.password === signInDto.password) {
      // TODO: Gen JWT and return it
      console.log('found and signed');
      const payload = { sub: user._id, username: user.username };
      const token = await this.jwtService.signAsync(payload);

      console.log({ token });

      return {
        access_token: token,
      };
    }

    throw new UnauthorizedException();
  }
}
