/* eslint-disable camelcase */
import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface UserUseCaseParams {
  name: string
  email: string
  number: string
  password_hash: string
  orgId?: string
}

interface UserUseCaseResponse {
  user: User
}

export class UserCreateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    number,
    orgId,
    password_hash,
  }: UserUseCaseParams): Promise<UserUseCaseResponse> {
    const user = await this.userRepository.create({
      name,
      email,
      number,
      orgId,
      password_hash,
    })

    return {
      user,
    }
  }
}
