import { PetsDetailsRepository } from '@/repositories/detailsPets-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Food, PetsDetail, Temperament } from '@prisma/client'
import { ResourcesNotFoundError } from './errors/resourcesNotFoundError'

interface PetsDetailsUseCaseParams {
  height: number
  weight: number
  temperament: Temperament
  food: Food
  petsId: string
}

interface PetsDetailsUseCaseResponse {
  detailsPets: PetsDetail
}

export class CreatePetsDetailsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private petsDetailRepository: PetsDetailsRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute({
    food,
    height,
    weight,
    temperament,
    petsId,
  }: PetsDetailsUseCaseParams): Promise<PetsDetailsUseCaseResponse> {
    const pet = await this.petRepository.findById(petsId)

    if (!pet) {
      throw new ResourcesNotFoundError()
    }

    console.log(height)
    console.log(weight)
    const detailsPets = await this.petsDetailRepository.createPetsDetail({
      food,
      height,
      weight,
      temperament,
      petsId,
    })

    return {
      detailsPets,
    }
  }
}
