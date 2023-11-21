import { ORG, Prisma } from '@prisma/client'

export interface FindManyOrgInCity {
  city: string
}

export interface OrgRepository {
  create(data: Prisma.ORGUncheckedCreateInput): Promise<ORG>
  findByEmail(email: string): Promise<ORG | null>
  findManyByCity(params: FindManyOrgInCity): Promise<ORG[]>
  findById(id: string): Promise<ORG | null>
}
