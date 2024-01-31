import { PetsNotFoundError } from '@/use-cases/errors/petsNotFoundError'
import { NotFoundError } from '@/use-cases/errors/userNotFoundError'
import { makeAdoptPetsUseCase } from '@/use-cases/factories/make-adopt-pet-user-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function adopt(request: FastifyRequest, reply: FastifyReply) {
  const adoptPetBodySchema = z.object({
    petId: z.string(),
  })

  const { petId } = adoptPetBodySchema.parse(request.body)

  try {
    const adoptPetUseCase = makeAdoptPetsUseCase()
    await adoptPetUseCase.execute({
      userId: request.user.sub,
      petId,
    })
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof PetsNotFoundError) {
      return reply.status(404).send({ Erro: err.message })
    }
  }

  return reply.status(204).send()
}
