import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { FindUserByEmailUseCase } from '../find-user-by-email'

export function makeFindUserByEmailUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const findByIdOrgUseCase = new FindUserByEmailUseCase(prismaUserRepository)

  return findByIdOrgUseCase
}
