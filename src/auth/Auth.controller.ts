import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './Auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { AuthGuard } from './Auth.guard';

@Controller('/auth')
export class AuthControler {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  createUser(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  getProfile() {
    return ['a'];
  }
}
