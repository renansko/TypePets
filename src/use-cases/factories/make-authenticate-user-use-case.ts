import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user'

export function makeUserAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUserUseCase(prismaUserRepository)

  return authenticateUseCase
}
