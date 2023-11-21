import { OrgRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { PETS } from '@prisma/client'

interface AdoptedUseCaseParams {
  userId: string
  petId: string
}

interface AdoptedUseCaseResponse {
  pet: PETS
  number?: string
}

export class AdoptedPetsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private petsRepository: PetsRepository,
    private ortRepository: OrgRepository,
  ) {}

  async execute({
    userId,
    petId,
  }: AdoptedUseCaseParams): Promise<AdoptedUseCaseResponse> {
    const pet = await this.petsRepository.adoptedPets(userId, petId)

    const org = await this.ortRepository.findById(pet.orgId)

    return {
      pet,
      number: org?.number,
    }
  }
}
