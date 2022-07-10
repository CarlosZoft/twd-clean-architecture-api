import { UserRepository } from '../ports/user-repository'
import { UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const alreadyExists = await this.exists(user)
    if (alreadyExists) {
      throw new Error('User already exists')
    }
    this.repository.push(user)
  }

  findUserByEmail (email: string): UserData | null {
    const user = this.repository.find((user) => user.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    if (!(await this.findUserByEmail(user.email))) {
      return false
    }
    return true
  }
}
