import { makeFindByIdOrgUseCase } from '@/use-cases/factories/make-find-by-id-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const findIdQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = findIdQuerySchema.parse(request.query)

  const findByIdOrgUseCase = makeFindByIdOrgUseCase()

  const { org } = await findByIdOrgUseCase.execute({ id })

  return reply.status(200).send({ org })
}
