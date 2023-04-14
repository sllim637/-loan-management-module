import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ ClientsModule.register([
    {
      name: 'RESPONSE_TO_BACKEND',
      transport: Transport.TCP,
      options: {
        port: 3000
      }
    },
  ]),
  HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
