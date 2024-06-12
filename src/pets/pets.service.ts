import { Injectable } from '@nestjs/common';

@Injectable()
export class PetsService {
  getAllPets(): string[] {
    return ['pet1', 'pet2'];
  }
}
