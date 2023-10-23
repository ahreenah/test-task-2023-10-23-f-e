import {injectable, inject} from 'inversify';
import {UserRepository} from './UserRepository';

@injectable()
export class AuthenticationService {

  constructor(
    @inject(UserRepository) private userRepository: UserRepository
  ) {}

  async login(login: string, password: string) {
    const requestRes = await this.userRepository.login(login, password)
    if (requestRes) {
      return requestRes
    }
    return null
  }

  async register(login: string, password: string) {
    const requestRes = await this.userRepository.register(login, password)
    if (requestRes) {
      return requestRes
    }
    return null
  }

  savePersistentToken(token: string) {
    localStorage.token = token
  }

  getPersistentToken() {
    if (localStorage.hasOwnProperty('token'))
      return localStorage.getItem('token')
    return null
  }

  logout() {
    localStorage.removeItem('token')
  }
}
