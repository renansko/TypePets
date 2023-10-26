// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryDetailsPetsRepository } from '@/repositories/inMemory/in-memory-details-repository'
import { CreatePetsDetailsUseCase } from './create-petDetails'
import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { ResourcesNotFoundError } from './errors/resourcesNotFoundError'

let petDetailsRepositoryInMemory: InMemoryDetailsPetsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetsDetailsUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    petDetailsRepositoryInMemory = new InMemoryDetailsPetsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetsDetailsUseCase(
      petDetailsRepositoryInMemory,
      petsRepository,
    )
  })
  it('should be able to create a new pet Details', async () => {
    const pet = await petsRepository.create({
      race: 'Chaw Chaw',
      type: 'Spitz',
      characteristics: 'Lingua azul',
      orgId: '1',
      userId: '1',
      Available: true,
    })

    const { detailsPets } = await sut.execute({
      food: 'LITTLE',
      height: 46.5,
      weight: 25.1,
      temperament: 'AGGRESSIVE',
      petsId: pet.id,
    })

    expect(detailsPets.id).toEqual(expect.any(String))
  })
  it('not should be able create a Pet Details with no pet associate ID ', async () => {
    expect(() =>
      sut.execute({
        food: 'LITTLE',
        height: 46.5,
        weight: 25.1,
        temperament: 'AGGRESSIVE',
        petsId: 'A_invalid_ID',
      }),
    ).rejects.toThrowError(ResourcesNotFoundError)
  })
})
