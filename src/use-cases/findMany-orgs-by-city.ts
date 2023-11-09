/* eslint-disable camelcase */
import { ORG } from '@prisma/client'
import { ResourcesNotFoundError } from './errors/resourcesNotFoundError'
import { OrgRepository } from '@/repositories/orgs-repository'

interface FindManyOrgByCityUseCaseParams {
  city: string
}

interface FindManyOrgByCityUseCaseResponse {
  orgs: ORG[]
}

export class FindManyOrgByCityUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    city,
  }: FindManyOrgByCityUseCaseParams): Promise<FindManyOrgByCityUseCaseResponse> {
    const orgs = await this.orgRepository.findManyByCity({ city })

    if (orgs === null) {
      throw new ResourcesNotFoundError()
    }
    return { orgs }
  }
}
