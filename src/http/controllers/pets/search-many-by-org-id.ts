import { makeSearchManyByOrgId } from '@/use-cases/factories/make-search-pets-by-org-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchByOrgIdPets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchManyByOrgIdBodySchema = z.object({
    orgId: z.string(),
  })

  const { orgId } = searchManyByOrgIdBodySchema.parse(request.query)

  const searchByCharacterPetsPetUseCase = makeSearchManyByOrgId()
  const pets = await searchByCharacterPetsPetUseCase.execute({
    orgId,
  })

  return reply.status(200).send({ pets })
}
