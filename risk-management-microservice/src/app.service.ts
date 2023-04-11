import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {



  handleDocument_Score(loadDocument: any) {
    console.log("the received data in risk microservice is : " , loadDocument)
  }
  getHello(): string {
    return 'Hello World!';
  }
}
