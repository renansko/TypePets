import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { AdoptedPetsUseCase } from '../adopetPet'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAdoptPetsUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const prismaPetRepository = new PrismaPetsRepository()
  const prismaUserRepository = new PrismaUserRepository()
  const adoptPetsUseCase = new AdoptedPetsUseCase(
    prismaPetRepository,
    prismaOrgRepository,
    prismaUserRepository,
  )

  return adoptPetsUseCase
}
