import { Prisma } from '@prisma/client'
import { UserRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findManyByOrgId(orgId: string) {
    const users = await prisma.user.findMany({
      where: {
        orgId,
      },
    })

    return users
  }

  async createAdminUser(userId: string, orgId: string) {
    const adminUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        orgId,
        role: 'ADMIN',
      },
    })

    return adminUser
  }
}
