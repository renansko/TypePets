import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserCreateUseCase } from '../create-user'

export function makeCreateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const createUserUseCase = new UserCreateUseCase(prismaUserRepository)

  return createUserUseCase
}
