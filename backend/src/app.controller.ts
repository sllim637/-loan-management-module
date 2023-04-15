import { EventPattern } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentState } from './models/document-state.enum';
import { LoanDocument } from './models/loan-document.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("")
  getLoanDocuments(): LoanDocument[] {
    return this.appService.getLoanDocuments();
  }

  @Get("getOne/:email")
  getLoanByEmail(@Param('email') email: string) {
    console.log("email : ", email)
    const loan = this.appService.getLoanByEmail(email)
    return loan
  }
  
  @Post("add")
  addLoanDocument(@Body() document: LoanDocument) {
    return this.appService.add(document)
  }


  @Post('loanResponse')
  getLoanResponse(@Body() loanResponse: any) {
    console.log("hello , I am storing lthis value :", loanResponse)
    return this.appService.handleFinalResponse(loanResponse)
  }
  
}
