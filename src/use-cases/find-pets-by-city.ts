import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { PETS } from '@prisma/client'

interface PetsFindByCityUseCaseParams {
  city: string
  orgInstance?: InMemoryOrgRepository
}

interface PetsFindByCityUseCaseResponse {
  pets: PETS[]
}

export class FindPetsByCityUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    orgInstance,
  }: PetsFindByCityUseCaseParams): Promise<PetsFindByCityUseCaseResponse> {
    const pets = await this.petsRepository.findPetsByOrgCity(city, orgInstance)

    return {
      pets,
    }
  }
}
