import { httpClient } from './httpClient';

interface MeResponse {
  name: string;
  email: string;
}

class UsersService {
  async me() {
    const { data } = await httpClient.get<MeResponse>('/users/me');

    return data;
  }
}

export default new UsersService();
