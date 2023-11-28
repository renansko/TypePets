import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FindOrgByIdUseCase } from '../find-orgs-by-id'

export function makeFindByIdOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const findByIdOrgUseCase = new FindOrgByIdUseCase(prismaOrgRepository)

  return findByIdOrgUseCase
}
