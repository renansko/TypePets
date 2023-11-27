import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetsCreateUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const createPetUseCase = new PetsCreateUseCase(prismaPetRepository)

  return createPetUseCase
}
