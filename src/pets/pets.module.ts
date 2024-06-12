import { Module } from '@nestjs/common';

import { PetsService } from './pets.service';
import { CustomInterceptor } from '../interceptors/test';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PetController } from './pets.controller';

@Module({
  imports: [],
  controllers: [PetController],
  providers: [
    PetsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomInterceptor,
    },
  ],
})
export class PetsModule {}
