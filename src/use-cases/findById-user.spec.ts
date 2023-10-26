// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { FindUserByIdCreateUseCase } from './findById-user'
import { ResourcesNotFoundError } from './errors/resourcesNotFoundError'

let userRepository: InMemoryUsersRepository
let sut: FindUserByIdCreateUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new FindUserByIdCreateUseCase(userRepository)
  })
  it('should be able to find a User by your id', async () => {
    const userId = await userRepository.create({
      name: 'Renan',
      email: 'Renansko@gmail.com',
      number: '41999088574',
      password_hash: '123456',
    })

    const expectResponse = {
      created_at: userId.created_at,
      email: 'Renansko@gmail.com',
      id: userId.id,
      name: 'Renan',
      number: '41999088574',
      orgId: null,
      password_hash: '123456',
      role: 'MEMBER',
    }

    const { user } = await sut.execute({ userId: userId.id })

    expect(user).toEqual(expectResponse)
  })

  it('not should be able a find user with he dont exist', async () => {
    await expect(() =>
      sut.execute({ userId: 'An-Id-if-not-exist' }),
    ).rejects.toThrowError(ResourcesNotFoundError)
  })
})
