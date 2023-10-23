import {observable, action, makeObservable} from 'mobx';
import {inject, injectable} from 'inversify';
import {AuthenticationService} from './AuthenticationService';
import {UserRepository} from './UserRepository';
import {createContext} from 'react';

@injectable()
export class UserStore {
  @observable user: any = null;
  token: string | null = null

  constructor(
    @inject(AuthenticationService) private authService: AuthenticationService,
    @inject(UserRepository) private userRepository: UserRepository
  ) {
    console.log('constructor called', authService, userRepository, this)
    this.token = this.authService.getPersistentToken()
    makeObservable(this);
    this.loadUserInfo()
  }

  loadUserInfo() {
    if (this.token)
      this.user = this.userRepository.getUserInfo(this.token);
  }

  @action async login(login: string, password: string): Promise<boolean> {
    console.log('in login', this)

    let res = await this.authService.login(login, password);
    if (res) {
      this.token = res.token
      this.authService.savePersistentToken(res.token)
      this.loadUserInfo()
      return true
    }
    return false
  }


  @action async register(login: string, password: string): Promise<any> {
    console.log('in login', this)

    let res = await this.authService.register(login, password);
    return res
  }

  @action logout() {
    this.token = null;
    this.authService.logout();
    this.user = null;
  }
}

const userStore = new UserStore(
  new AuthenticationService(new UserRepository()),
  new UserRepository()
);

console.log('Exists', userStore)

export default userStore;

export const UserStoreContext = createContext(userStore)
