import { Category } from '../entities/Category';
import { httpClient } from './httpClient';

type CategoriesResponse = Category[];

class CategoriesService {
  async getAll() {
    const { data } = await httpClient.get<CategoriesResponse>('/categories');

    return data;
  }
}

export default new CategoriesService();
