import { EventPattern } from '@nestjs/microservices';
import { Controller, Get, Post , Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentState } from './models/document-state.enum';
import { LoanDocument } from './models/loan-document.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getLoanDocuments(): LoanDocument[] {
    return this.appService.getLoanDocuments();
  }

  @Post("add")
  addLoanDocument(@Body() document: LoanDocument) {  
    return this.appService.add(document)
  }


  @Post('loanResponse')
  getLoanResponse(@Body() loadResponse : any){
    console.log("the loan response is :" , loadResponse)
  }
}
