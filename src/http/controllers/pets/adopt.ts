import { makeAdoptPetsUseCase } from '@/use-cases/factories/make-adopt-pet-user-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function adopt(request: FastifyRequest, reply: FastifyReply) {
  const adoptPetBodySchema = z.object({
    userId: z.string(),
    petId: z.string(),
  })

  const { userId, petId } = adoptPetBodySchema.parse(request.body)

  const adoptPetUseCase = makeAdoptPetsUseCase()

  await adoptPetUseCase.execute({
    userId,
    petId,
  })

  return reply.status(204).send()
}
