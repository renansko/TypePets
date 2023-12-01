import { Prisma, Role, User } from '@prisma/client'

export interface UserRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findManyByOrgId(orgId: string): Promise<User[]>
  createAdminUser(userId: string, orgId: string, role: Role): Promise<User>
}
