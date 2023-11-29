import { makeSearchByCharacterPets } from '@/use-cases/factories/make-search-pets-by-character-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchByCharacterPets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchByCharacterPetsQuerySchema = z.object({
    characteristics: z.string(),
  })

  const { characteristics } = searchByCharacterPetsQuerySchema.parse(
    request.query,
  )

  const searchByCharacterPetsPetUseCase = makeSearchByCharacterPets()
  const pets = await searchByCharacterPetsPetUseCase.execute({
    characteristics,
  })

  return reply.status(200).send({ pets })
}
