import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LoanDocument } from '../../backend/src/models/loan-document.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_document')
  
  receiveDocument(loadDocument: LoanDocument) {
    return this.appService.handleDocument(loadDocument);
  }
}
