import { User } from '../entities/User';
import { httpClient } from './httpClient';

type MeResponse = User;

class UsersService {
  async me() {
    const { data } = await httpClient.get<MeResponse>('/users/me');

    return data;
  }
}

export default new UsersService();
