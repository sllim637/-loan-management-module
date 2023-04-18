import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DocumentState } from './models/document-state.enum';
import { LoanDocument } from './models/loan-document.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {

  private loanDocuments: LoanDocument[] = []
  private acceptedLoan: any[] = []
  private refusedLoan: any[] = [] = []
  private base64Documents : any[] = []
  constructor(@Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
  @Inject('HTML_CONVERSION') private readonly creditServiceCommunicator: ClientProxy
  ) {

  }

  getLoanDocuments(): LoanDocument[] {
    return this.loanDocuments;
  }

  add(document: LoanDocument) {
    if (document) {
      document.state = DocumentState.ONREVIEW
      document.id = uuid()
      this.loanDocuments.push(document)
      this.communicationClient.emit(
        'user_document',
        document
      );
    }
    return document
  }

  handleFinalResponse(finalResponse: any) {
    if (finalResponse.state === 1) {
      this.acceptedLoan.push(finalResponse)
    } else {
      this.refusedLoan.push(finalResponse)
    }
    return finalResponse
  }
  getLoanById(id: string) {
    let loan = this.acceptedLoan.find(element => element.id === id)
    if (loan === undefined ){
      loan = this.refusedLoan.find(element => element.id === id)
    }
    return loan
  }

  convertHtmlPage(url : string){
    this.creditServiceCommunicator.emit('page_url' , url)
    console.log("convertHtml page method is finished !")
  }

  saveThedocumentPdf(base64OfDocument){
    console.log("the document of base64 is :" , base64OfDocument)
    this.base64Documents.push(base64OfDocument)
  }

  getBase64OfPdf(){
    return this.base64Documents[0]
  }
}

