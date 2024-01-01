import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUserById(userId: string) {
    return this.usersRepository.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });
  }
}
