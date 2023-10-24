import { PETS, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { FindPetsIfCharacteristics, PetsRepository } from '../pets-repository'

// Criar detalhes juntamente
export class InMemoryPetsRepository implements PetsRepository {
  async create(data: Prisma.PETSUncheckedCreateInput) {
    const pets = {
      id: randomUUID(),
      race: data.race,
      type: data.type,
      characteristics: data.characteristics,
      Available: data.Available ?? true,
      orgId: data.orgId,
      userId: data.userId ?? null,
      created_at: new Date(),
    }

    this.item.push(pets)

    return pets
  }

  async searchManyByOrgId(orgId: string) {
    return this.item.filter((item) => item.orgId === orgId)
  }

  async searchManyCharacter(params: FindPetsIfCharacteristics) {
    return this.item.filter(
      (item) => item.characteristics === params.characteristics,
    )
  }

  async findById(id: string) {
    const pet = this.item.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  public item: PETS[] = []
}
