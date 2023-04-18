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

  @Get("getOne/:id")
  getLoanById(@Param('id') id: string) {
    console.log("email : ", id)
    const loan = this.appService.getLoanById(id)
    return loan
  }
  @Get("getPdf")
  getPdf() {
    return this.appService.getBase64OfPdf()
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

  @Post("download")
  download(@Query('url') url: string) {
    return this.appService.convertHtmlPage(url)
  }

  @Post('savePdfDocument')
  savePdf(@Body() base64Document) {
    console.log("the base64 received is : ", base64Document)
    return this.appService.saveThedocumentPdf(base64Document)
  }

}
