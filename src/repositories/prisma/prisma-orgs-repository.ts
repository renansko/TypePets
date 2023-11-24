import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FindManyOrgInCity, OrgRepository } from '../orgs-repository'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.ORGUncheckedCreateInput) {
    const org = await prisma.oRG.create({ data })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findManyByCity(params: FindManyOrgInCity) {
    console.log(params.city)
    const org = await prisma.oRG.findMany({
      where: {
        city: params.city,
      },
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        id,
      },
    })

    return org
  }
}
