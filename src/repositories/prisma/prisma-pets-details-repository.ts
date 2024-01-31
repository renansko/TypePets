import { Prisma } from '@prisma/client'
import { PetsDetailsRepository } from '../detailsPets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsDetailsRepository implements PetsDetailsRepository {
  async createPetsDetail(data: Prisma.PetsDetailUncheckedCreateInput) {
    return await prisma.petsDetail.create({ data })
  }

  async findById(id: string) {
    const petDetails = await prisma.petsDetail.findMany({
      where: {
        id,
      },
    })

    return petDetails
  }
}
