/* eslint-disable camelcase */
import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotFoundError } from './errors/userNotFoundError'
import { OrgRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/OrgNotFoundError'
import { UserAlreadyAssociateOrgError } from './errors/userAlreadyAssociateOrg'

interface NewAdminUserUseCaseParams {
  orgId: string
  userId: string
}

interface NewAdminUserUseCaseResponse {
  adminUser: User
}

export class NewUserAdminCreateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private userRepository: UserRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    orgId,
    userId,
  }: NewAdminUserUseCaseParams): Promise<NewAdminUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (user === null) {
      throw new UserNotFoundError()
    }

    if (user.orgId !== orgId && user.orgId !== null) {
      throw new UserAlreadyAssociateOrgError()
    }

    const org = await this.orgRepository.findById(orgId)

    if (org === null) {
      throw new OrgNotFoundError()
    }

    const adminUser = await this.userRepository.createAdminUser(orgId, userId)

    return {
      adminUser,
    }
  }
}
