// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { ResourcesNotFoundError } from './errors/resourcesNotFoundError'
import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'
import { FindOrgByIdUseCase } from './find-orgs-by-id'

let orgRepository: InMemoryOrgRepository
let sut: FindOrgByIdUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new FindOrgByIdUseCase(orgRepository)
  })
  it('should be able to find a organization by your id', async () => {
    const organization = await orgRepository.create({
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'HappyPets@gmail.com',
      number: '41985456525',
      password_hash: '123456',
      address: 'Rua itacolome',
    })

    const expectResponse = {
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'HappyPets@gmail.com',
      number: '41985456525',
      password_hash: '123456',
      address: 'Rua itacolome',
      PETS: null,
      created_at: organization.created_at,
      id: organization.id,
      role: 'ADMIN',
      users_id: null,
    }

    const { org } = await sut.execute({ id: organization.id })

    expect(org).toEqual(expectResponse)
  })

  it('not should be able a find organizations with he dont exist', async () => {
    await expect(() =>
      sut.execute({ id: 'An-Id-if-not-exist' }),
    ).rejects.toThrowError(ResourcesNotFoundError)
  })
})
