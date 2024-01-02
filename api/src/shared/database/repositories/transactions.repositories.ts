import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTransactionDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createTransactionDto);
  }

  update(updateTransactionDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateTransactionDto);
  }

  delete(deleteTransactionDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteTransactionDto);
  }

  findMany(findManyTransactionDto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findManyTransactionDto);
  }

  findFirst(findFirstTransactionDto: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirstTransactionDto);
  }
}
