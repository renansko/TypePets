import { makeFindByCityOrgUseCase } from '@/use-cases/factories/make-find-org-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findByCity(request: FastifyRequest, reply: FastifyReply) {
  const findByCityOrgBodySchema = z.object({
    city: z.string(),
  })

  const { city } = findByCityOrgBodySchema.parse(request.query)

  // const city = query.city.toUpperCase()

  console.log(city)
  const findByCityOrgUseCase = makeFindByCityOrgUseCase()
  const orgs = await findByCityOrgUseCase.execute({
    city,
  })

  return reply.status(200).send({ orgs: { ...orgs, password_hash: undefined } })
}
