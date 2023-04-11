import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DocumentState } from './models/document-state.enum';
import { LoanDocument } from './models/loan-document.entity';

@Injectable()
export class AppService {

  private loanDocuments: LoanDocument[] = []

  constructor(@Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,) {

  }

  getLoanDocuments(): LoanDocument[] {
    return this.loanDocuments;
  }

  add(document: LoanDocument) {
    if (document) {
      document.state = DocumentState.ONREVIEW
      this.loanDocuments.push(document)
      this.communicationClient.emit(
        'user_document',
        document
      );
    }
  }
}
