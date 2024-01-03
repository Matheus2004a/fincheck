import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { OptionalParseEnumPipe } from 'src/shared/pipes/OptionalParseEnumPipe';
import { OptionalParseUUIDPipe } from 'src/shared/pipes/OptionalParseUUIDPipe';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/Transaction';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(TransactionType))
    type?: TransactionType,
  ) {
    return this.transactionsService.findAllUserById(userId, {
      month,
      year,
      bankAccountId,
      type,
    });
  }

  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      userId,
      transactionId,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
