/* eslint-disable camelcase */
import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface NewAdminUserUseCaseParams {
  orgId: string
  userId: string
}

interface NewAdminUserUseCaseResponse {
  adminUser: User
}

export class NewUserAdminCreateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    orgId,
    userId,
  }: NewAdminUserUseCaseParams): Promise<NewAdminUserUseCaseResponse> {
    const adminUser = await this.userRepository.createAdminUser(orgId, userId)

    return {
      adminUser,
    }
  }
}
