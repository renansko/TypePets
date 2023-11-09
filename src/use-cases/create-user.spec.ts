// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { UserCreateUseCase } from './create-user'
import { EmailAlreadyExistError } from './errors/emailAlreadyExisist'

let userRepository: InMemoryUsersRepository
let sut: UserCreateUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new UserCreateUseCase(userRepository)
  })
  it('should be able to create a new User', async () => {
    const { user } = await sut.execute({
      name: 'Renan',
      email: 'Joe@gmail.com',
      number: '41999088574',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('not should be able create a user with Email arealdy exist', async () => {
    const email = 'JoeDoe@gmail.com'

    await sut.execute({
      name: 'Renan',
      email,
      number: '41999088574',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Joe Doe',
        email,
        password: '123456',
        number: '12345646',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistError)
  })
})
