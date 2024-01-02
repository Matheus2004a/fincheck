import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './services/bank-accounts.service';
import { ValidateBankAccountOwnershipService } from './services/validate-ownership-bank-account.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnershipService],
  exports: [ValidateBankAccountOwnershipService],
})
export class BankAccountsModule {}
