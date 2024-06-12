import {
  Controller,
  // Delete,
  Get,
  // Post,
  // Put,
  // Param,
  // Body,
  // HttpCode,
  // ParseIntPipe,
  // ParseUUIDPipe,
} from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import { PetsService } from './pets.service';

@Controller('/pets')
export class PetController {
  constructor(private readonly petsService: PetsService) {}

  @Get('/all')
  getAllPets() {
    return this.petsService.getAllPets();
  }

  // @Get('/:id')
  // getPost(@Param('id', ParseIntPipe) id: string) {
  //   console.log({ id });
  //   return ['a'];
  // }

  // @Post()
  // createPost(@Body() body: { name: string }) {
  //   console.log(body);
  //   return 'created';
  // }

  // @Put('/:id')
  // updatePost() {
  //   return 'updated';
  // }

  // @HttpCode(204)
  // @Delete('/:id')
  // deletePost() {
  //   return 'deleted';
  // }
}
