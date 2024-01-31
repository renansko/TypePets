import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPetsDetailsRepository } from '@/repositories/prisma/prisma-pets-details-repository'
import { CreatePetsDetailsUseCase } from '../create-petDetails'

export function makeCreatePetDetailsUseCase() {
  const prismaPetsDetailsRepository = new PrismaPetsDetailsRepository()
  const prismaPetRepository = new PrismaPetsRepository()
  const createPetsDetailsUseCase = new CreatePetsDetailsUseCase(
    prismaPetsDetailsRepository,
    prismaPetRepository,
  )

  return createPetsDetailsUseCase
}
