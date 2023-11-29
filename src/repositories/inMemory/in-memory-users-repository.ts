import { randomUUID } from 'crypto'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../users-repository'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async createAdminUser(organizationId: string, userId: string) {
    const indiceUser = this.items.findIndex((item) => item.id === userId)

    const adminUser: User = {
      ...this.items[indiceUser],
      orgId: organizationId,
      role: 'ADMIN',
    }

    this.items.splice(indiceUser, 1, adminUser)

    return adminUser
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      number: data.number,
      orgId: data.orgId ?? null,
      created_at: new Date(),
      role: data.role ?? 'MEMBER',
    }

    this.items.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findManyByOrgId(orgId: string) {
    return this.items.filter((item) => item.orgId === orgId)
  }
}
