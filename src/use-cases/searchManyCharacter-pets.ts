import { PetsRepository } from '@/repositories/pets-repository'
import { PETS } from '@prisma/client'

interface PetsSearchUseCaseParams {
  characteristics: string
}

interface PetsSearchUseCaseResponse {
  pets: PETS[]
}

export class SearchManyCharacterUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    characteristics,
  }: PetsSearchUseCaseParams): Promise<PetsSearchUseCaseResponse> {
    const pets = await this.petsRepository.searchManyCharacter({
      characteristics,
    })

    return {
      pets,
    }
  }
}
