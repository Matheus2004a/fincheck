import { httpClient } from './httpClient';

interface UserInfosProps {
  name: string;
  email: string;
}

class UsersService {
  async me() {
    const { data } = await httpClient.get<UserInfosProps>('/users/me');

    return data;
  }
}

export default new UsersService();
