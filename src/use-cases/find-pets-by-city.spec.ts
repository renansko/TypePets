// Patern 'InMemoryTest DataBase'

import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { FindPetsByCityUseCase } from './find-pets-by-city'
import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'

let petRepositoryInMemory: InMemoryPetsRepository
let orgRepository: InMemoryOrgRepository
let sut: FindPetsByCityUseCase

describe('Find pets by city', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepositoryInMemory = new InMemoryPetsRepository()
    sut = new FindPetsByCityUseCase(petRepositoryInMemory)
  })
  it('should be able to list all pets in a city', async () => {
    const org = await orgRepository.create({
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'HappyPets@gmail.com',
      number: '41985456525',
      password_hash: '123456',
      address: 'Rua itacolome',
    })

    await petRepositoryInMemory.create({
      race: 'Chaw Chaw',
      type: 'Spitz',
      characteristics: 'Lingua azul',
      orgId: org.id,
      Available: true,
    })

    await petRepositoryInMemory.create({
      race: 'Doblermen',
      type: 'High',
      characteristics: 'Lingua azul',
      orgId: org.id,
      Available: true,
    })

    await petRepositoryInMemory.create({
      race: 'Doblermen',
      type: 'High',
      characteristics: 'Lingua azul',
      orgId: '1',
      Available: true,
    })

    const { pets } = await sut.execute({
      city: 'Curitiba',
      orgInstance: orgRepository,
    })

    expect(pets).toHaveLength(2)
  })
  it('Find a empty list of pets with non pets on city', async () => {
    expect(() =>
      sut.execute({
        city: 'An-characteristc-if-not-exist',
        orgInstance: orgRepository,
      }),
    ).contain([])
  })
})
