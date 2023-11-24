// Patern 'InMemoryTest DataBase'

import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { AdoptedPetsUseCase } from './adopetPet'
import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'

let petRepositoryInMemory: InMemoryPetsRepository
let userRepository: InMemoryUsersRepository
let orgRepository: InMemoryOrgRepository
let sut: AdoptedPetsUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    petRepositoryInMemory = new InMemoryPetsRepository()
    userRepository = new InMemoryUsersRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new AdoptedPetsUseCase(petRepositoryInMemory, orgRepository)
  })
  it('should be able a adopet a pet with he is avaible', async () => {
    const user = await userRepository.create({
      name: 'Renan',
      email: 'Joe@gmail.com',
      number: '41999088574',
      password_hash: '123456',
    })
    const org = await orgRepository.create({
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'Cantinho do cachorro',
      number: '41985456525',
      password_hash: '123456',
      address: 'Rua itacolome',
    })
    const pet = await petRepositoryInMemory.create({
      race: 'Pit Bull',
      type: 'Spitz',
      characteristics: 'Bombado',
      orgId: org.id,
      userId: user.id,
      Available: true,
    })

    const petAdoted = await sut.execute({ userId: user.id, petId: pet.id })
    expect(petAdoted.pet.Available).toBeFalsy()
  })
})
