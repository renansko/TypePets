export class NotFoundError extends Error {
  constructor() {
    super('Cannot find a resource with this ID')
  }
}
