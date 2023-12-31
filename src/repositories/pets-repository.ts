import { ORG, PETS, Prisma } from '@prisma/client'

export interface FindPetsIfCharacteristics {
  characteristics: string
}

export interface PetsRepository {
  create(data: Prisma.PETSUncheckedCreateInput): Promise<PETS>
  searchManyByOrgId(oRGId: string): Promise<PETS[]>
  searchManyCharacter(params: FindPetsIfCharacteristics): Promise<PETS[]>
  findById(id: string): Promise<PETS | null>
  findPetsByOrgCity(org: ORG[]): Promise<PETS[]>
  adoptedPets(userId: string, petId: string): Promise<PETS>
}
