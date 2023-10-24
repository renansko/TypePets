import { PetsRepository } from '@/repositories/pets-repository'
import { PETS } from '@prisma/client'

interface PetsUseCaseParams {
  race: string
  type: string
  characteristics: string
  userId?: string
  orgId: string
  Available: boolean
}

interface PetsUseCaseResponse {
  pets: PETS
}

export class PetsCreateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    race,
    type,
    characteristics,
    orgId,
    userId,
    Available,
  }: PetsUseCaseParams): Promise<PetsUseCaseResponse> {
    const pets = await this.petsRepository.create({
      race,
      Available,
      type,
      characteristics,
      orgId,
      userId,
    })

    return {
      pets,
    }
  }
}
