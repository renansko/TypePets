import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org'

export function makeOrgAuthenticateUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const authenticateUseCase = new AuthenticateOrgUseCase(prismaOrgRepository)

  return authenticateUseCase
}
