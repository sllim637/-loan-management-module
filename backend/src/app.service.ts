import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DocumentState } from './models/document-state.enum';
import { LoanDocument } from './models/loan-document.entity';

@Injectable()
export class AppService {

  private loanDocuments: LoanDocument[] = []
  private acceptedLoan: any[] = []
  private refusedLoan: any[] = []
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

  handleFinalResponse(finalResponse: any) {
    if (finalResponse.state === 1) {
      this.acceptedLoan.push(finalResponse)
    } else {
      this.refusedLoan.push(finalResponse)
    }
    return finalResponse
  }
  getLoanByEmail(email: string) {
    let loan = this.acceptedLoan.find(element => element.email === email)
    return loan
  }
}

