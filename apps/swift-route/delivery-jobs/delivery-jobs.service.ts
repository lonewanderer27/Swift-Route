import { Injectable } from "@nestjs/common";
import { deliveryJobsStore } from "../src/stores";

@Injectable()
export class DeliveryJobsService {
  private jobs = deliveryJobsStore;

  findAll() {
    return this.jobs;
  }

  findOne(id: string) {
    return this.jobs.find((job) => job.id === id);
  }
}
