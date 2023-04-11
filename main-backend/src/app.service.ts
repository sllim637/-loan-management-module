import { Injectable } from '@nestjs/common';
import { LoanDocument } from './models/loan-document.entity';

@Injectable()
export class AppService {

  private loanDocuments: LoanDocument[]


  getLoanDocuments(): LoanDocument[] {
    return this.loanDocuments;
  }

  add(document: LoanDocument) {
    if (document) {
      this.loanDocuments.push(document)
    }
  }
}
