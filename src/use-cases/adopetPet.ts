import { OrgRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { UserRepository } from '@/repositories/users-repository'
import { PETS } from '@prisma/client'
import { UserNotFoundError } from './errors/userNotFoundError'
import { PetsNotFoundError } from './errors/petsNotFoundError'
import { PetIsNotAvaiable } from './errors/petNotAvaibleError'

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
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    petId,
  }: AdoptedUseCaseParams): Promise<AdoptedUseCaseResponse> {
    // validar
    const pets = await this.petsRepository.findById(petId)

    if (pets === null) {
      throw new PetsNotFoundError()
    }
    const user = await this.userRepository.findById(userId)

    if (user === null) {
      throw new UserNotFoundError()
    }

    const petAvaiable = await this.petsRepository.findById(petId)

    if (petAvaiable?.Available === false) {
      throw new PetIsNotAvaiable()
    }

    const pet = await this.petsRepository.adoptedPets(userId, petId)

    const org = await this.ortRepository.findById(pet.orgId)

    return {
      pet,
      number: org?.number,
    }
  }
}
