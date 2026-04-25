import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { DeliveryJob, DeliveryStatus } from "@swift-route/types";
import { CreateDeliveryJobInput } from "./dto/create-delivery-job.dto";
import { UpdateDeliveryJobInput } from "./dto/put-delivery-job.dto";
import { DeliveryJobsService } from "./delivery-jobs.service";
import { PatchDeliveryJobInput } from "./dto/patch-delivery-job.dto";
import { PatchStatusInput } from "./dto/patch-status.dto";
import { UUID } from "crypto";

@Controller("delivery-jobs")
export class DeliveryJobsController {
  constructor(private deliveryJobsService: DeliveryJobsService) {}

  @Get()
  findCourierJobs(
    /*
      Ideally courierId should be of type UUID, however document
      specifically asked for it to be a string. So I kept it
      as a string type here.

      It is set to UUID type onj findAll method though
      which is not part of the specification, just to test the usage
      of ParseUUIDPipe in such ideal scenario.
    */
    @Query("courierId") courierId: string,
    @Query("status") status: DeliveryStatus,
  ): DeliveryJob[] {
    return this.deliveryJobsService.findCourierJobs(courierId, status);
  }

  @Get("/all")
  findAll(
    @Query("courierId", ParseUUIDPipe) courierId: UUID,
    @Query("status") status: DeliveryStatus,
  ): DeliveryJob[] {
    return this.deliveryJobsService.findAll(courierId, status);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.deliveryJobsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() body: CreateDeliveryJobInput) {
    return this.deliveryJobsService.createOne(body);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  updateOne(
    @Param("id") id: string,
    @Body() body: UpdateDeliveryJobInput,
  ) {
    return this.deliveryJobsService.putOne(id, body);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  patchOne(
    @Param("id") id: string,
    @Body() body: PatchDeliveryJobInput,
  ) {
    return this.deliveryJobsService.patchOne(id, body);
  }

  @Patch(":id/status")
  @HttpCode(HttpStatus.OK)
  patchStatus(
    @Param("id") id: string,
    @Body() body: PatchStatusInput,
  ) {
    return this.deliveryJobsService.patchStatus(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  removeOne(
    @Param("id") id: string,
  ) {
    return this.deliveryJobsService.deleteOne(id);
  }
}
