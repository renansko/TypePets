import { PetsNotFoundError } from '@/use-cases/errors/petsNotFoundError'
import { UserNotFoundError } from '@/use-cases/errors/userNotFoundError'
import { makeAdoptPetsUseCase } from '@/use-cases/factories/make-adopt-pet-user-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function adopt(request: FastifyRequest, reply: FastifyReply) {
  const adoptPetBodySchema = z.object({
    userId: z.string(),
    petId: z.string(),
  })

  const { userId, petId } = adoptPetBodySchema.parse(request.body)

  try {
    const adoptPetUseCase = makeAdoptPetsUseCase()
    await adoptPetUseCase.execute({
      userId,
      petId,
    })
  } catch (err) {
    if (err instanceof UserNotFoundError || err instanceof PetsNotFoundError) {
      return reply.status(404).send({ Erro: err.message })
    }
  }

  return reply.status(204).send()
}
