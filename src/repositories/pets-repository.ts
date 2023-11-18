import { PETS, Prisma } from '@prisma/client'
import { InMemoryOrgRepository } from './inMemory/in-memory-org-repository'

export interface FindPetsIfCharacteristics {
  characteristics: string
}

export interface PetsRepository {
  create(data: Prisma.PETSUncheckedCreateInput): Promise<PETS>
  searchManyByOrgId(oRGId: string): Promise<PETS[]>
  searchManyCharacter(params: FindPetsIfCharacteristics): Promise<PETS[]>
  findById(id: string): Promise<PETS | null>
  findPetsByOrgCity(
    city: string,
    orgInstance?: InMemoryOrgRepository,
  ): Promise<PETS[]>
  adoptedPets(userId: string, petId: string): Promise<PETS>
}
