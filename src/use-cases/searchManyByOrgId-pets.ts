import { PetsRepository } from '@/repositories/pets-repository'
import { PETS } from '@prisma/client'

interface PetsSearchByOrgIdUseCaseParams {
  orgId: string
}

interface PetsSearchByOrgIdUseCaseResponse {
  pets: PETS[]
}

export class SearchManyByOrgIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
  }: PetsSearchByOrgIdUseCaseParams): Promise<PetsSearchByOrgIdUseCaseResponse> {
    const pets = await this.petsRepository.searchManyByOrgId(orgId)

    return {
      pets,
    }
  }
}
