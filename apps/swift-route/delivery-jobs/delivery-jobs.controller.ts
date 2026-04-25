import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { deliveryJobsStore } from "../src/stores";
import { DeliveryJob } from "@swift-route/types";
import { CreateDeliveryJobModel } from "./dto/create-delivery-job.dto";

@Controller("delivery-jobs")
export class DeliveryJobsController {
  // TODO: GET /delivery-jobs
  @Get()
  findAll(): DeliveryJob[] {
    return deliveryJobsStore;
  }
  // TODO: GET /delivery-jobs/:id
  @Get(":id")
  findOne(@Param("id") id: string) {
    return deliveryJobsStore.find((record) => record.id === id);
  }
  // TODO: POST /delivery-jobs
  @Post()
  createOne(@Body() createDeliveryJobModel: CreateDeliveryJobModel) {
    return createDeliveryJobModel;
  }
  // TODO: PATCH /delivery-jobs/:id/status
}
