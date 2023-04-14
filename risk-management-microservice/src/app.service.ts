import { ClientProxy } from '@nestjs/microservices';
import { Injectable ,Inject } from '@nestjs/common';
import { DocumentState } from '../../backend/src/models/document-state.enum';
import { LoanDocument } from '../../backend/src/models/loan-document.entity';

@Injectable()
export class AppService {

    constructor(@Inject('RESPONSE_TO_BACKEND') private readonly communicationClient: ClientProxy){

    }


  handleDocument_Score(loanDocument: any) {
    console.log("the received data in risk microservice is : ", loanDocument)
    const finalScore = Math.random() + loanDocument.firstScore
    let finalLoanDocument : LoanDocument = loanDocument.document
    if(finalScore > 0.5){
      finalLoanDocument.state = DocumentState.ACCEPTED
    }else{
      finalLoanDocument.state = DocumentState.REFUSED
    }
    console.log("the final data is :" , finalLoanDocument)
    this.communicationClient.emit("final_response" , finalLoanDocument)
  }
  getHello(): string {
    return 'Hello World!';
  }
}
