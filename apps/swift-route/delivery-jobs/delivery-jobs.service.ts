import { Injectable } from "@nestjs/common";
import { deliveryJobsStore } from "../src/stores";

@Injectable()
export class DeliveryJobsService {
  private jobs = deliveryJobsStore;

  findAll() {
    return this.jobs;
  }
}
