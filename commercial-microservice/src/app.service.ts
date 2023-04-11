import { Inject, Injectable } from '@nestjs/common';
import { LoanDocument } from '../../backend/src/models/loan-document.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(@Inject('COMMERCIAL-RISK-COMMUNICATION') private readonly communicationClient: ClientProxy) {

  }

  getHello(): string {
    return 'Hello World!';
  }

  handleDocument(loanDocument: LoanDocument) {
    const firstScore = Math.random()
    this.communicationClient.emit(
      'first_score',
      {
        document: loanDocument,
        firstScore: firstScore
      }
    );
    return firstScore
  }
}
