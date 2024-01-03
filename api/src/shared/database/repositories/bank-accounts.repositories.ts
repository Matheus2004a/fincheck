import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBankAccountDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createBankAccountDto);
  }

  update(updateBankAccountDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateBankAccountDto);
  }

  delete(deleteBankAccountDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(deleteBankAccountDto);
  }

  findMany<T extends Prisma.BankAccountFindManyArgs>(
    findManyBankAccountDto: Prisma.SelectSubset<
      T,
      Prisma.BankAccountFindManyArgs
    >,
  ) {
    return this.prismaService.bankAccount.findMany(findManyBankAccountDto);
  }

  findFirst(findFirstAccountDto: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirstAccountDto);
  }
}
