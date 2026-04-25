import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryJobsService } from './delivery-jobs.service';

describe('DeliveryJobsService', () => {
  let service: DeliveryJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryJobsService],
    }).compile();

    service = module.get<DeliveryJobsService>(DeliveryJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
