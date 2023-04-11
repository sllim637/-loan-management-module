import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentState } from './models/document-state.enum';
import { LoanDocument } from './models/loan-document.entity';

@Controller("main-backend")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLoanDocuments(): LoanDocument[] {
    return this.appService.getLoanDocuments();
  }

  @Post("add")
  addLoanDocument(document : LoanDocument){
    document.state = DocumentState.ONREVIEW
    return this.appService.add(document)
  }
}
