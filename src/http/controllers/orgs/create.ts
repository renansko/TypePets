import { EmailAlreadyExistError } from '@/use-cases/errors/emailAlreadyExisist'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    email: z.string().email(),
    number: z.string(),
    password: z.string().min(6),
    address: z.string(),
  })

  const { name, city, email, number, password, address } =
    createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()
    await createOrgUseCase.execute({
      name,
      city,
      email,
      number,
      password,
      address,
    })
    return reply.status(201).send
  } catch (err) {
    if (err instanceof EmailAlreadyExistError) {
      return reply.status(409).send({ Erro: err.message })
    }
  }
}
