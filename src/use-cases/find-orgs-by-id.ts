import { OrgRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { ResourcesNotFoundError } from './errors/resourcesNotFoundError'

interface OrgsFindByIdUseCaseParams {
  id: string
}

interface OrgsFindByIdUseCaseResponse {
  org: ORG
}

export class FindOrgByIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    id,
  }: OrgsFindByIdUseCaseParams): Promise<OrgsFindByIdUseCaseResponse> {
    const org = await this.orgsRepository.findById(id)

    if (org === null) {
      throw new ResourcesNotFoundError()
    }

    return {
      org,
    }
  }
}
