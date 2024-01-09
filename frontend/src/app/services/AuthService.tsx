import { httpClient } from './httpClient';

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

export type SigninParams = Omit<SignupParams, 'name'>

interface AuthResponse {
  accessToken: string
}

class AuthService {
  async signup(body: SignupParams) {
    const { data } = await httpClient.post<AuthResponse>('/auth/signup', body);

    return data;
  }

  async signin(body: SigninParams) {
    const { data } = await httpClient.post<AuthResponse>('/auth/signin', body);

    return data;
  }
}

export default new AuthService();
