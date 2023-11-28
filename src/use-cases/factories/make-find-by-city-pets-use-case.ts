import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FindPetsByCityUseCase } from '../find-pets-by-city'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFindByCityUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const prismaPetRepository = new PrismaPetsRepository()
  const findByEmailOrgUseCase = new FindPetsByCityUseCase(
    prismaPetRepository,
    prismaOrgRepository,
  )

  return findByEmailOrgUseCase
}
