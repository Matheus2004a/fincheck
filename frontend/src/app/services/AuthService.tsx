import { httpClient } from './httpClient';

interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string
}

class AuthService {
  async signup(body: SignupParams) {
    const { data } = await httpClient.post<SignupResponse>('/auth/signup', body);

    return data;
  }
}

export default new AuthService();
