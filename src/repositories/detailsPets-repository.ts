import { PetsDetail, Prisma } from '@prisma/client'

export interface PetsDetailsRepository {
  createPetsDetail(
    data: Prisma.PetsDetailUncheckedCreateInput,
  ): Promise<PetsDetail>
  findById(id: string): Promise<PetsDetail[] | null>
}
