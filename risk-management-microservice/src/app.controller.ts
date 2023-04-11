import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('first_score')
  
  recieveScore(loadDocument: any) {
    return this.appService.handleDocument_Score(loadDocument);
  }
  
}
