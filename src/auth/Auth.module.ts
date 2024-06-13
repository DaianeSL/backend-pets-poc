import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthControler } from './Auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthControler],
  exports: [AuthService],
})
export class AuthModule {}
