import { PetsRepository } from '@/repositories/pets-repository'
import { PETS } from '@prisma/client'

interface AdoptedUseCaseParams {
  userId: string
  petId: string
}

interface AdoptedUseCaseResponse {
  pet: PETS
}

export class AdoptedPetsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    userId,
    petId,
  }: AdoptedUseCaseParams): Promise<AdoptedUseCaseResponse> {
    const pet = await this.petsRepository.adoptedPets(userId, petId)

    return {
      pet,
    }
  }
}
