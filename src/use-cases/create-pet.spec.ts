// Patern 'InMemoryTest DataBase'

import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { PetsCreateUseCase } from './create-pet'
import { describe, beforeEach, it, expect } from 'vitest'

let petRepositoryInMemory: InMemoryPetsRepository
let sut: PetsCreateUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    petRepositoryInMemory = new InMemoryPetsRepository()
    sut = new PetsCreateUseCase(petRepositoryInMemory)
  })
  it('should be able to create a new pet', async () => {
    const { pets } = await sut.execute({
      race: 'Chaw Chaw',
      type: 'Spitz',
      characteristics: 'Lingua azul',
      orgId: '1',
      userId: '1',
      Available: true,
    })

    expect(pets.id).toEqual(expect.any(String))
  })
})
