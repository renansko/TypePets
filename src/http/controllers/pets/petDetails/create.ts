import { makeCreatePetDetailsUseCase } from '@/use-cases/factories/make-create-pet-details-use-case'
import { Food, Temperament } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetDetailBodySchema = z.object({
    height: z.number(),
    weight: z.number(),
    temperament: z.nativeEnum(Temperament),
    petsId: z.string().uuid(),
    food: z.nativeEnum(Food),
  })

  const { height, weight, temperament, petsId, food } =
    createPetDetailBodySchema.parse(request.body)

  const createPetDetailsUseCase = makeCreatePetDetailsUseCase()
  const petDetails = await createPetDetailsUseCase.execute({
    height,
    weight,
    temperament,
    petsId,
    food,
  })

  return reply.status(201).send({ petDetails })
}
