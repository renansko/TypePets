import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByCity } from './find-by-city'
import { searchByCharacterPets } from './search-many-by-characteristics'
import { searchByOrgIdPets } from './search-many-by-org-id'
import { adopt } from './adopt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pet', create)

  app.get('/pets/:city', findByCity)
  app.get('/pets/Characteristics/:characteristics', searchByCharacterPets)
  app.get('/pets/orgId/:orgId', searchByOrgIdPets)

  app.put('/pets/adopt', adopt)
}
