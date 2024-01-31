import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { compare } from 'bcryptjs'
import { NotFoundError } from './errors/userNotFoundError'

interface AutenticateUseCaseRequest {
  email: string
  password: string
}

interface AutenticateUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
