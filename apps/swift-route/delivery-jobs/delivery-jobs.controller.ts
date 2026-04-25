import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { DeliveryJob } from "@swift-route/types";
import { CreateDeliveryJobInput } from "./dto/create-delivery-job.dto";
import { UpdateDeliveryJobInput } from "./dto/update-delivery-job.dto";
import { DeliveryJobsService } from "./delivery-jobs.service";

@Controller("delivery-jobs")
export class DeliveryJobsController {
  constructor(private deliveryJobsService: DeliveryJobsService) {}

  /*
    TODO: GET /delivery-jobs

    required param: ?courierId (string)
    optional param: ?status (DeliveryStatus)
  */
  @Get()
  findAll(): DeliveryJob[] {
    return this.deliveryJobsService.findAll();
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
  updateOne(
    @Param("id") id: string,
    @Body() body: UpdateDeliveryJobInput,
  ) {
    return this.deliveryJobsService.putOne(id, body);
  }

  // TODO: PATCH /delivery-jobs/:id/status

  // TODO: DELETE /delivery-jobs/:id
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  removeOne(
    @Param("id") id: string,
  ) {
    return this.deliveryJobsService.deleteOne(id);
  }
}
