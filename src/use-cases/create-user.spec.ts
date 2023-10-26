// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { UserCreateUseCase } from './create-user'

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
      email: 'Renansko@gmail.com',
      number: '41999088574',
      password_hash: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
