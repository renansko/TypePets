// Patern 'InMemoryTest DataBase'

import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { SearchManyPetsByOrgIdUseCase } from './searchManyPetsByOrgId-pets'

let petRepositoryInMemory: InMemoryPetsRepository
let sut: SearchManyPetsByOrgIdUseCase

describe('Search Many By OrgID', () => {
  beforeEach(() => {
    petRepositoryInMemory = new InMemoryPetsRepository()
    sut = new SearchManyPetsByOrgIdUseCase(petRepositoryInMemory)
  })
  it('should be able to list a pets to one org', async () => {
    await petRepositoryInMemory.create({
      name: 'Alberto',
      race: 'Chaw Chaw',
      type: 'Spitz',
      characteristics: 'Lingua azul',
      orgId: '1',
      userId: '1',
      Available: true,
    })

    await petRepositoryInMemory.create({
      name: 'Alberto',
      race: 'Pit Bull',
      type: 'Spitz',
      characteristics: 'Bombado',
      orgId: 'e8c302b0-8b34-4dfd-b004-47f932706ce5',
      userId: '2',
      Available: true,
    })

    await petRepositoryInMemory.create({
      name: 'Alberto',
      race: 'Chaw Chaw',
      type: 'Spitz',
      characteristics: 'Lingua azul',
      orgId: 'e8c302b0-8b34-4dfd-b004-47f932706ce5',
      userId: '2',
      Available: true,
    })

    const { pets } = await sut.execute({
      orgId: 'e8c302b0-8b34-4dfd-b004-47f932706ce5',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ characteristics: 'Bombado' }),
      expect.objectContaining({ characteristics: 'Lingua azul' }),
    ])
  })

  it('Find a empty list of pets with id is not valid ', async () => {
    expect(() => sut.execute({ orgId: 'An-Id-if-not-exist' })).contain([])
  })
})
