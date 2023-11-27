import { OrgRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { PETS } from '@prisma/client'

interface PetsFindByCityUseCaseParams {
  city: string
}

interface PetsFindByCityUseCaseResponse {
  pets: PETS[]
}

export class FindPetsByCityUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private petsRepository: PetsRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    city,
  }: PetsFindByCityUseCaseParams): Promise<PetsFindByCityUseCaseResponse> {
    const org = await this.orgRepository.findManyByCity({ city })

    const pets = await this.petsRepository.findPetsByOrgCity(org)

    return {
      pets,
    }
  }
}
