// Patern 'InMemoryTest DataBase'

import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { SearchManyByOrgIdUseCase } from './searchManyByOrgId-pets'

let petRepositoryInMemory: InMemoryPetsRepository
let sut: SearchManyByOrgIdUseCase

describe('Search Many By OrgID', () => {
  beforeEach(() => {
    petRepositoryInMemory = new InMemoryPetsRepository()
    sut = new SearchManyByOrgIdUseCase(petRepositoryInMemory)
  })
  it('should be able to list a pets to one org', async () => {
    await petRepositoryInMemory.create({
      race: 'Chaw Chaw',
      type: 'Spitz',
      characteristics: 'Lingua azul',
      orgId: '1',
      userId: '1',
      Available: true,
    })

    await petRepositoryInMemory.create({
      race: 'Pit Bull',
      type: 'Spitz',
      characteristics: 'Bombado',
      orgId: '1',
      userId: '2',
      Available: true,
    })

    const orgId = '1'

    const { pets } = await sut.execute({ orgId })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ characteristics: 'Lingua azul' }),
      expect.objectContaining({ characteristics: 'Bombado' }),
    ])
  })
})
