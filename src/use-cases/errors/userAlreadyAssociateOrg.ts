export class UserAlreadyAssociateOrgError extends Error {
  constructor() {
    super('This user already associate with a org')
  }
}
