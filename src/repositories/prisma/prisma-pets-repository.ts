import { ORG, Prisma } from '@prisma/client'
import { FindPetsIfCharacteristics, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PETSUncheckedCreateInput) {
    const pet = await prisma.pETS.create({ data })

    return pet
  }

  async searchManyByOrgId(oRGId: string) {
    const pets = await prisma.pETS.findMany({
      where: {
        orgId: oRGId,
      },
      include: {
        petsDetail: {
          distinct: ['created_at', 'id', 'petsId'],
        },
      },
    })

    return pets
  }

  async searchManyCharacter(params: FindPetsIfCharacteristics) {
    const Pets = await prisma.pETS.findMany({
      where: {
        characteristics: params.characteristics,
      },
      include: {
        petsDetail: {
          distinct: ['created_at', 'id', 'petsId'],
        },
      },
    })

    return Pets
  }

  async findById(id: string) {
    const pet = await prisma.pETS.findUnique({
      where: {
        id,
      },
      include: {
        petsDetail: {
          distinct: ['created_at', 'id', 'petsId'],
        },
      },
    })

    return pet
  }

  async findPetsByOrgCity(org: ORG[]) {
    const petIds = org.map((org) => org.id)
    const PetsByOrgCity = await prisma.pETS.findMany({
      where: {
        orgId: {
          in: petIds,
        },
      },
      include: {
        petsDetail: {
          distinct: ['created_at', 'id', 'petsId'],
        },
      },
    })
    return PetsByOrgCity
  }

  async adoptedPets(userId: string, petId: string) {
    const pet = await prisma.pETS.update({
      where: {
        id: petId,
      },
      data: {
        userId,
        Available: false,
      },
    })

    return pet
  }
}
