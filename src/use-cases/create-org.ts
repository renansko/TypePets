/* eslint-disable camelcase */
import { OrgRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistError } from './errors/emailAlreadyExisist'

interface OrgsUseCaseParams {
  name: string
  email: string
  password: string
  city: string
  number: string
  address: string
}

interface OrgsUseCaseResponse {
  org: ORG
}

export class OrgCreateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    password,
    city,
    number,
    address,
  }: OrgsUseCaseParams): Promise<OrgsUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistError()
    }
    const org = await this.orgRepository.create({
      name,
      email,
      password_hash,
      city,
      number,
      address,
    })

    return {
      org,
    }
  }
}
