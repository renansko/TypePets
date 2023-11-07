/* eslint-disable camelcase */
import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './errors/userAlreadyExisist'

interface UserUseCaseParams {
  name: string
  email: string
  number: string
  password: string
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
    password,
  }: UserUseCaseParams): Promise<UserUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

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
