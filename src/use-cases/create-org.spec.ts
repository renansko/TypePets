// Patern 'InMemoryTest DataBase'

import { describe, beforeEach, it, expect } from 'vitest'
import { EmailAlreadyExistError } from './errors/emailAlreadyExisist'
import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'
import { OrgCreateUseCase } from './create-org'

let orgRepository: InMemoryOrgRepository
let sut: OrgCreateUseCase

describe('Org register Use case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new OrgCreateUseCase(orgRepository)
  })
  it('should be able to create a new organization', async () => {
    const { org } = await sut.execute({
      name: 'Happy Pets',
      city: 'Curitiba',
      email: 'HappyPets@gmail.com',
      number: '41985456525',
      password: '123456',
      address: 'Rua itacolome',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('not should be able create a org with Email arealdy exist', async () => {
    const email = 'HappyPets@gmail.com'

    await sut.execute({
      name: 'Happy Pets',
      city: 'Curitiba',
      email,
      number: '41985456525',
      password: '123456',
      address: 'Rua itacolome',
    })

    await expect(() =>
      sut.execute({
        name: 'Happy Pets',
        city: 'Curitiba',
        email,
        number: '41985456525',
        password: '123456',
        address: 'Rua itacolome',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistError)
  })
})
