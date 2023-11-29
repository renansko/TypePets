import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchManyPetsByOrgIdUseCase } from '../searchManyPetsByOrgId-pets'

export function makeSearchManyByOrgId() {
  const prismaPetRepository = new PrismaPetsRepository()
  const searchByOrgIdPets = new SearchManyPetsByOrgIdUseCase(
    prismaPetRepository,
  )

  return searchByOrgIdPets
}
