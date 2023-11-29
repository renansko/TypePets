export class UserNotFoundError extends Error {
  constructor() {
    super('Cannot find a user with this ID')
  }
}
