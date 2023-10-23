import {injectable} from 'inversify';


const API_URL = 'http://localhost:5000'

@injectable()
export class UserRepository {
  async login(login: string, password: string) {
    let res: {status: false} | {status: true, token: string} = await fetch(
      `${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Connect-src': 'localhost:5000',
      },
      body: JSON.stringify({
        login,
        password
      })
    }).then(r => r.json())
    if (res.status) {
      return {
        token: res.token
      }
    }
    return null
  }

  async register(login: string, password: string) {
    let res: {status: false} | {status: true, token: string} = await fetch(
      `${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Connect-src': 'localhost:5000',
      },
      body: JSON.stringify({
        login,
        password
      })
    }).then(r => r.json())
    return res
  }

  async getUserInfo(token: string) {
    let res: {status: false} | {status: true, token: string} = await fetch(
      `${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Authentication': token,
        'Content-type': 'application/json',
        'Connect-src': 'localhost:5000',
      },
    }).then(r => r.json())
    console.log(res)
    return res;
  }
}
