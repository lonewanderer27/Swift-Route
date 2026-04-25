import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryJobsModule } from './delivery-jobs/delivery-jobs.module';

@Module({
  imports: [DeliveryJobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
