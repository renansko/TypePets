import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { AdoptedPetsUseCase } from '../adopetPet'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAdoptPetsUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const prismaPetRepository = new PrismaPetsRepository()
  const adoptPetsUseCase = new AdoptedPetsUseCase(
    prismaPetRepository,
    prismaOrgRepository,
  )

  return adoptPetsUseCase
}
