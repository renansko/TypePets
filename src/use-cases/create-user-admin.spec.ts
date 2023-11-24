/* eslint-disable camelcase */
// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { NewUserAdminCreateUseCase } from './create-user-admin'
import { hash } from 'bcryptjs'
import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'
import { UserAlreadyAssociateOrgError } from './errors/userAlreadyAssociateOrg'

let userRepository: InMemoryUsersRepository
let orgRepository: InMemoryOrgRepository
let sut: NewUserAdminCreateUseCase

describe('Register admin Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new NewUserAdminCreateUseCase(userRepository)
  })
  it('should be able to create a new admin user', async () => {
    const password_hash = await hash('123456', 6)
    const user = await userRepository.create({
      name: 'Renan',
      email: 'Joe@gmail.com',
      number: '41999088574',
      password_hash,
    })

    const org = await orgRepository.create({
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'HappyPets@gmail.com',
      number: '41985456525',
      password_hash,
      address: 'Rua itacolome',
    })

    const response = await sut.execute({ orgId: org.id, userId: user.id })

    expect(response.adminUser).toEqual(
      expect.objectContaining({ orgId: org.id }),
    )
  })
  it('not should be able to create a new admin user with user has orgId associated is different', async () => {
    const password_hash = await hash('123456', 6)
    const user = await userRepository.create({
      name: 'Renan',
      email: 'Joe@gmail.com',
      number: '41999088574',
      password_hash,
    })

    const org = await orgRepository.create({
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'HappyPets@gmail.com',
      number: '41985456525',
      password_hash,
      address: 'Rua itacolome',
    })

    const org_2 = await orgRepository.create({
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'h@gmail.com',
      number: '41985456525',
      password_hash,
      address: 'Rua itacolome',
    })

    await sut.execute({ orgId: org.id, userId: user.id })

    await expect(() =>
      sut.execute({ orgId: org_2.id, userId: user.id }),
    ).rejects.toBeInstanceOf(UserAlreadyAssociateOrgError)
  })
})
