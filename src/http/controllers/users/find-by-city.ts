import { makeFindUserByEmailUseCase } from '@/use-cases/factories/make-find-user-by-email'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findByEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findByEmailUserQuerySchema = z.object({
    email: z.string(),
  })

  const { email } = findByEmailUserQuerySchema.parse(request.query)

  const findUserByEmailUseCase = makeFindUserByEmailUseCase()
  const user = await findUserByEmailUseCase.execute({
    email,
  })

  return reply.status(200).send({ user })
}
