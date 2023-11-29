import { ORG, PETS, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindPetsIfCharacteristics, PetsRepository } from '../pets-repository'

// Criar detalhes juntamente
export class InMemoryPetsRepository implements PetsRepository {
  public items: PETS[] = []
  async adoptedPets(userId: string, petId: string) {
    const indicePet = this.items.findIndex((item) => item.id === petId)

    const novosDados: PETS = {
      ...this.items[indicePet],
      Available: false,
      userId,
    }

    this.items.splice(indicePet, 1, novosDados)

    return novosDados
  }

  async create(data: Prisma.PETSUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      race: data.race,
      type: data.type,
      characteristics: data.characteristics,
      Available: data.Available ?? true,
      orgId: data.orgId,
      userId: data.userId ?? null,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findPetsByOrgCity(org: ORG[]) {
    const PetsByOrgCity = this.items.filter((pet) => {
      return org.find((org) => org.id === pet.orgId)
    })

    return PetsByOrgCity
  }

  async searchManyByOrgId(orgId: string) {
    return this.items.filter((item) => item.orgId === orgId)
  }

  async searchManyCharacter(params: FindPetsIfCharacteristics) {
    return this.items.filter(
      (items) => items.characteristics === params.characteristics,
    )
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
