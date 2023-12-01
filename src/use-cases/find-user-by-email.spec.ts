// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { FindUserByEmailUseCase } from './find-user-by-email'
import { UserNotFoundError } from './errors/userNotFoundError'

let userRepository: InMemoryUsersRepository
let sut: FindUserByEmailUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new FindUserByEmailUseCase(userRepository)
  })
  it('should be able to find a User by your email', async () => {
    const userInfo = await userRepository.create({
      name: 'Renan',
      email: 'Renansko@gmail.com',
      number: '41999088574',
      password_hash: '123456',
    })

    const expectResponse = {
      created_at: userInfo.created_at,
      email: 'Renansko@gmail.com',
      id: userInfo.id,
      name: 'Renan',
      number: '41999088574',
      orgId: null,
      password_hash: '123456',
      role: 'MEMBER',
    }

    const { user } = await sut.execute({ email: 'Renansko@gmail.com' })

    expect(user).toEqual(expectResponse)
  })

  it('not should be able a find user with he dont exist', async () => {
    await expect(() =>
      sut.execute({ email: 'An-Id-if-not-exist' }),
    ).rejects.toThrowError(UserNotFoundError)
  })
})
