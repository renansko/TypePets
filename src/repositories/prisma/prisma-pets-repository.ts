import { PETS, ORG, Prisma } from '@prisma/client'
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
    })

    return pets
  }

  async searchManyCharacter(params: FindPetsIfCharacteristics) {
    const Pets = await prisma.pETS.findMany({
      where: {
        characteristics: params.characteristics,
      },
    })

    return Pets
  }

  async findById(id: string) {
    const pet = await prisma.pETS.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findPetsByOrgCity(org: ORG[]) {
    const pets: PETS[] = []

    org.forEach(async (org) => {
      const pet = await prisma.pETS.findMany({
        where: {
          ORG: {
            name: {
              contains: org.id,
            },
          },
        },
      })
      pets.push(...pet)
    })

    return pets
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
