import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.TCP,
        options : {
          port : 3001
        }
      },
    ]),
    ClientsModule.register([
      {
        name: 'HTML_CONVERSION',
        transport: Transport.TCP,
        options : {
          port : 3003
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
