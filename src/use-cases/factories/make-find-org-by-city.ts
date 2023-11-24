import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FindManyOrgByCityUseCase } from '../findMany-orgs-by-city'

export function makeFindByCityOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const findByCityOrgUseCase = new FindManyOrgByCityUseCase(prismaOrgRepository)

  return findByCityOrgUseCase
}
