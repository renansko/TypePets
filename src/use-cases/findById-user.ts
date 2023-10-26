/* eslint-disable camelcase */
import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourcesNotFoundError } from './errors/resourcesNotFoundError'

interface UserFindByIdUseCaseParams {
  userId: string
}

interface UserByIdUseCaseResponse {
  user: User
}

export class FindUserByIdCreateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: UserFindByIdUseCaseParams): Promise<UserByIdUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (user === null) {
      throw new ResourcesNotFoundError()
    }
    return {
      user,
    }
  }
}
