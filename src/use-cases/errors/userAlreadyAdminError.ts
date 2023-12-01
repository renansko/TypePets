export class UserAlreadyAdminError extends Error {
  constructor() {
    super('This user already admin')
  }
}
