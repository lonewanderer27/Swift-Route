import { Injectable } from "@nestjs/common";
import { deliveryJobsStore } from "../src/stores";
import { CreateDeliveryJobInput, CreateDeliveryJobModel } from "./dto/create-delivery-job.dto";

@Injectable()
export class DeliveryJobsService {
  private jobs = deliveryJobsStore;

  findAll() {
    return this.jobs;
  }

  findOne(id: string) {
    return this.jobs.find((job) => job.id === id);
  }

  createOne(body: CreateDeliveryJobInput) {
    // create a delivery job object
    const newJob = new CreateDeliveryJobModel(body)

    // push the new job to our static list
    this.jobs.push(newJob);
  }

  deleteOne(id: string) {
    // re-assign the jobs list without the specified record
    this.jobs = this.jobs.filter((job) => job.id != id);
  }
}
