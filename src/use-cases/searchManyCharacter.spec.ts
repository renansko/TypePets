// Patern 'InMemoryTest DataBase'

import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { SearchManyCharacterUseCase } from './searchManyCharacter-pets'

let petRepositoryInMemory: InMemoryPetsRepository
let sut: SearchManyCharacterUseCase

describe('Search by Characteristic Use Case', () => {
  beforeEach(() => {
    petRepositoryInMemory = new InMemoryPetsRepository()
    sut = new SearchManyCharacterUseCase(petRepositoryInMemory)
  })
  it('should be able to list a pets with your characteristcs', async () => {
    await petRepositoryInMemory.create({
      name: 'Alberto',
      race: 'Chaw Chaw',
      type: 'Spitz',
      characteristics: 'Lingua azul',
      orgId: '1',
      userId: '1',
      Available: true,
    })
    const { pets } = await sut.execute({ characteristics: 'Lingua azul' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ characteristics: 'Lingua azul' }),
    ])
  })
  it('Find a empty list of pets with non characteristcis is associate', async () => {
    expect(() =>
      sut.execute({ characteristics: 'An-characteristc-if-not-exist' }),
    ).contain([])
  })
})
