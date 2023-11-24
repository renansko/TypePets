import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgCreateUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const createOrgUseCase = new OrgCreateUseCase(prismaOrgRepository)

  return createOrgUseCase
}
