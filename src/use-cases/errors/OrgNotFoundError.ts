export class OrgNotFoundError extends Error {
  constructor() {
    super('Cannot find a org with this ID')
  }
}
