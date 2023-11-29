import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchManyCharacterUseCase } from '../searchManyCharacter-pets'

export function makeSearchByCharacterPets() {
  const prismaPetRepository = new PrismaPetsRepository()
  const searchByCharacterPets = new SearchManyCharacterUseCase(
    prismaPetRepository,
  )

  return searchByCharacterPets
}
