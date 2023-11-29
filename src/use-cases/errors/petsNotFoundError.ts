export class PetsNotFoundError extends Error {
  constructor() {
    super('Cannot find a pet with this ID')
  }
}
