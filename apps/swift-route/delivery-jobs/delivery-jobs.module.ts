import { Module } from '@nestjs/common';
import { DeliveryJobsController } from './delivery-jobs.controller';
import { DeliveryJobsService } from './delivery-jobs.service';

@Module({
  controllers: [DeliveryJobsController],
  providers: [DeliveryJobsService]
})
export class DeliveryJobsModule {}
