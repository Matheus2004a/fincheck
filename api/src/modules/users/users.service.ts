import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const userExist = await this.usersRepository.findByEmail({
      where: { email },
    });

    if (userExist) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await this.usersRepository.create({
      data: {
        id: randomUUID(),
        email,
        name,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              {
                id: randomUUID(),
                name: 'Salário',
                icon: 'salary',
                type: 'INCOME',
              },
              {
                id: randomUUID(),
                name: 'Freelance',
                icon: 'freelance',
                type: 'INCOME',
              },
              {
                id: randomUUID(),
                name: 'Outro',
                icon: 'other',
                type: 'INCOME',
              },
              // Expense
              { id: randomUUID(), name: 'Casa', icon: 'home', type: 'EXPENSE' },
              {
                id: randomUUID(),
                name: 'Alimentação',
                icon: 'food',
                type: 'EXPENSE',
              },
              {
                id: randomUUID(),
                name: 'Educação',
                icon: 'education',
                type: 'EXPENSE',
              },
              { id: randomUUID(), name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              {
                id: randomUUID(),
                name: 'Mercado',
                icon: 'grocery',
                type: 'EXPENSE',
              },
              {
                id: randomUUID(),
                name: 'Roupas',
                icon: 'clothes',
                type: 'EXPENSE',
              },
              {
                id: randomUUID(),
                name: 'Transporte',
                icon: 'transport',
                type: 'EXPENSE',
              },
              {
                id: randomUUID(),
                name: 'Viagem',
                icon: 'travel',
                type: 'EXPENSE',
              },
              {
                id: randomUUID(),
                name: 'Outro',
                icon: 'other',
                type: 'EXPENSE',
              },
            ],
          },
        },
      },
    });

    return newUser;
  }
}
