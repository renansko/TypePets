import { makeFindByCityUseCase } from '@/use-cases/factories/make-find-by-city-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findByCity(request: FastifyRequest, reply: FastifyReply) {
  const findByCityOrgBodySchema = z.object({
    city: z.string(),
  })

  const { city } = findByCityOrgBodySchema.parse(request.query)

  const findByCityPetUseCase = makeFindByCityUseCase()
  const pets = await findByCityPetUseCase.execute({
    city,
  })

  return reply.status(200).send({ pets })
}
