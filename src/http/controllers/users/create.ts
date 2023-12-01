import { EmailAlreadyExistError } from '@/use-cases/errors/emailAlreadyExisist'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    number: z.string(),
    password: z.string(),
  })

  const { name, email, number, password } = createUserBodySchema.parse(
    request.body,
  )
  try {
    const createUserUseCase = makeCreateUserUseCase()
    const user = await createUserUseCase.execute({
      name,
      email,
      number,
      password,
    })

    return reply.status(201).send({ user })
  } catch (err) {
    if (err instanceof EmailAlreadyExistError) {
      return reply.status(409).send({ Erro: err.message })
    }
  }
}
