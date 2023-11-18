import { randomUUID } from 'crypto'
import { ORG, Prisma } from '@prisma/client'
import { FindManyOrgInCity, OrgRepository } from '../orgs-repository'

export class InMemoryOrgRepository implements OrgRepository {
  public items: ORG[] = []

  async findManyByCity(params: FindManyOrgInCity) {
    return this.items.filter((items) => items.city === params.city)
  }

  async create(data: Prisma.ORGUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? 'ADMIN',
      number: data.number,
      created_at: new Date(),
      city: data.city,
      users_id: data.users_id ?? null,
      PETS: data.PETS ?? null,
      address: data.address,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((items) => items.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
