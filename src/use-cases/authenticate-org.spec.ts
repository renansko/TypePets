import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgRepository } from '@/repositories/inMemory/in-memory-org-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'

let orgRepositoryInMemory: InMemoryOrgRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgRepositoryInMemory = new InMemoryOrgRepository()
    sut = new AuthenticateOrgUseCase(orgRepositoryInMemory)
  })
  it('should be able to autheticate one Org', async () => {
    await orgRepositoryInMemory.create({
      address: 'Itacolomi',
      city: 'Curitiba',
      email: 'JoeDoe@gmail.com',
      name: 'Joe',
      number: '41999584565',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'JoeDoe@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
