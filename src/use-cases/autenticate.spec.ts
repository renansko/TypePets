import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user'
import { hash } from 'bcryptjs'

let userRepositoryInMemory: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(userRepositoryInMemory)
  })
  it('should be able to autheticate one user', async () => {
    await userRepositoryInMemory.create({
      email: 'JoeDoe@gmail.com',
      name: 'Joe',
      number: '41999584565',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'JoeDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
