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
import { UpdateDeliveryJobModel } from "./dto/update-delivery-job.dto";
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

  // TODO: PUT /delivery-jobs/:id
  @Put(":id")
  updateOne(
    @Param("id") id: string,
    @Body() updateDeliveryJobModel: UpdateDeliveryJobModel,
  ) {
    const { id: _ignoredId, ...updatePayload } = updateDeliveryJobModel;

    return {
      id,
      ...updatePayload,
    };
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
