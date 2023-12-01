import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { NewUserAdminCreateUseCase } from '../create-user-admin'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeUserToAdminUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const orgRepository = new PrismaOrgRepository()
  const makeUserToAdminUseCase = new NewUserAdminCreateUseCase(
    prismaUserRepository,
    orgRepository,
  )

  return makeUserToAdminUseCase
}
