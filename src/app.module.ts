import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/Auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/pets'),
    PetsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
