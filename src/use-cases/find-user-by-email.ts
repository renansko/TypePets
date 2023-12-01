import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotFoundError } from './errors/userNotFoundError'

interface UserFindByEmailUseCaseParams {
  email: string
}

interface UserFindByEmailUseCaseResponse {
  user: User
}

export class FindUserByEmailUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: UserFindByEmailUseCaseParams): Promise<UserFindByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (user === null) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
