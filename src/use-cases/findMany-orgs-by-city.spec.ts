// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'
import { FindManyOrgByCityUseCase } from './findMany-orgs-by-city'

let orgRepository: InMemoryOrgRepository
let sut: FindManyOrgByCityUseCase

describe('Search Many By OrgID', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new FindManyOrgByCityUseCase(orgRepository)
  })
  it('should be able to list a pets to one org', async () => {
    await orgRepository.create({
      name: 'Happy Pets',
      city: 'curitiba',
      email: 'happy@gmail.com',
      number: '41985456525',
      password_hash: '123456',
    })

    await orgRepository.create({
      name: 'Happy Pets',
      city: 'curitiba',
      email: 'happy2@gmail.com',
      number: '41985456525',
      password_hash: '123456',
    })

    const { orgs } = await sut.execute({
      city: 'curitiba',
    })

    expect(orgs).toHaveLength(2)
  })

  it('Not shloud be able find a org with not exist', async () => {
    expect(() => sut.execute({ city: 'An-org-if-not-exist' })).contain([])
  })
})
