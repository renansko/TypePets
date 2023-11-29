import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    race: z.string(),
    type: z.string(),
    characteristics: z.string(),
    orgId: z.string(),
    Available: z.boolean().default(true),
  })

  const { name, race, type, characteristics, orgId, Available } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()
  const pet = await createPetUseCase.execute({
    name,
    race,
    type,
    characteristics,
    orgId,
    Available,
  })

  return reply.status(201).send({ pet })
}
