import { makeUserToAdminUseCase } from '@/use-cases/factories/make-user-to-admin'
import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function userToAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userToAdminBodySchema = z.object({
    orgId: z.string(),
    role: z.nativeEnum(Role),
  })

  const { orgId, role } = userToAdminBodySchema.parse(request.body)

  const userToAdminUseCase = makeUserToAdminUseCase()
  await userToAdminUseCase.execute({
    orgId,
    userId: request.user.sub,
    role,
  })

  return reply
    .status(200)
    .send({ message: `User ${request.user.sub} is now ${role}` })
}
