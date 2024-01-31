import { ORG } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { compare } from 'bcryptjs'
import { OrgRepository } from '@/repositories/orgs-repository'
import { NotFoundError } from './errors/userNotFoundError'

interface AutenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AutenticateOrgUseCaseResponse {
  org: ORG
}

export class AuthenticateOrgUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AutenticateOrgUseCaseRequest): Promise<AutenticateOrgUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new NotFoundError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
