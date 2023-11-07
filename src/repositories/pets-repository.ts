import { PETS, Prisma } from '@prisma/client'

export interface FindManyPetsInCity {
  city: string
}

export interface FindPetsIfCharacteristics {
  characteristics: string
}

export interface PetsRepository {
  create(data: Prisma.PETSUncheckedCreateInput): Promise<PETS>
  searchManyByOrgId(oRGId: string): Promise<PETS[]>
  searchManyCharacter(params: FindPetsIfCharacteristics): Promise<PETS[]>
  findById(id: string): Promise<PETS | null>
}
