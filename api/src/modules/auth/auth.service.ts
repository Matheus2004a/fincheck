import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Senha inválida');
    }

    const payload = { userId: user.id, username: user.name };

    const accessToken = await this.generateAccessToken(payload);

    return { accessToken };
  }

  async signup(singupDto: SignupDto) {
    const { email, name, password } = singupDto;

    const userExist = await this.usersRepository.findUnique({
      where: { email },
    });

    if (userExist) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await this.usersRepository.create({
      data: {
        email,
        name,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              {
                name: 'Salário',
                icon: 'salary',
                type: 'INCOME',
              },
              {
                name: 'Freelance',
                icon: 'freelance',
                type: 'INCOME',
              },
              {
                name: 'Outro',
                icon: 'other',
                type: 'INCOME',
              },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              {
                name: 'Alimentação',
                icon: 'food',
                type: 'EXPENSE',
              },
              {
                name: 'Educação',
                icon: 'education',
                type: 'EXPENSE',
              },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              {
                name: 'Mercado',
                icon: 'grocery',
                type: 'EXPENSE',
              },
              {
                name: 'Roupas',
                icon: 'clothes',
                type: 'EXPENSE',
              },
              {
                name: 'Transporte',
                icon: 'transport',
                type: 'EXPENSE',
              },
              {
                name: 'Viagem',
                icon: 'travel',
                type: 'EXPENSE',
              },
              {
                name: 'Outro',
                icon: 'other',
                type: 'EXPENSE',
              },
            ],
          },
        },
      },
    });

    const payload = { userId: newUser.id, username: newUser.name };

    const accessToken = await this.generateAccessToken(payload);

    return { accessToken };
  }

  private generateAccessToken(payload: { userId: string; username: string }) {
    return this.jwtService.signAsync({
      sub: payload.userId,
      username: payload.username,
    });
  }
}
