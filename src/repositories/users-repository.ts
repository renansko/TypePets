import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findManyByOrgId(orgId: string): Promise<User[]>
}
