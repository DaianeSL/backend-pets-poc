import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';

@Controller('/auth')
export class AuthControler {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  createUser(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refresh(refreshTokenDto);
    return tokens;
  }
}
