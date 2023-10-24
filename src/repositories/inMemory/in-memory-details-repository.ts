import { Prisma, PetsDetail } from '@prisma/client'
import { PetsDetailsRepository } from '../detailsPets-repository'
import { randomUUID } from 'crypto'

export class InMemoryDetailsPetsRepository implements PetsDetailsRepository {
  public items: PetsDetail[] = []
  async createPetsDetail(data: Prisma.PetsDetailUncheckedCreateInput) {
    const petsDetail = {
      id: randomUUID(),
      height: new Prisma.Decimal(data.height.toString()),
      weight: new Prisma.Decimal(data.weight.toString()),
      temperament: data.temperament ?? null,
      food: data.food ?? null,
      created_at: new Date(),
      petsId: data.petsId ?? null,
    }

    this.items.push(petsDetail)

    return petsDetail
  }

  async findById(id: string) {
    const detailsPets = this.items.filter((item) => item.id === id)

    if (!detailsPets) {
      return null
    }

    return detailsPets
  }
}
