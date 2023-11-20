export class PetNotAvaibleError extends Error {
  constructor() {
    super('Pet not associate with no Org!')
  }
}
