import {
  Courier,
  DeliveryJob,
  DeliveryNote,
  DeliveryStatus,
  PackageType,
} from "@swift-route/types";
import { randomUUID } from "crypto";

export type UpdateDeliveryJobInput = {
  pickup_address: string;
  dropoff_address: string;
  package_type: PackageType;
  status: DeliveryStatus;
  courier: string;
  notes?: string[];
};

export class UpdateDeliveryJobModel implements DeliveryJob {
  public id: string;
  public pickupAddress: string;
  public dropoffAddress: string;
  public packageType: PackageType;
  public status: DeliveryStatus;
  public notes: DeliveryNote[];
  public courier: Courier;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: string, createdAt: Date, input: UpdateDeliveryJobInput) {
    // id, createdAt fields must be preserved
    this.id = id;
    this.pickupAddress = input.pickup_address;
    this.dropoffAddress = input.dropoff_address;
    this.packageType = input.package_type;
    this.status = input.status;
    this.createdAt = createdAt;
    this.updatedAt = new Date();

    // Transform note strings → DeliveryNote objects
    this.notes = (input.notes ?? []).map((note) => ({
      id: randomUUID(),
      createdAt: new Date(),
      deliveryId: this.id,
      note: note,
    }));

    // Transform courier name -> Courier object
    this.courier = {
      id: randomUUID(),
      name: input.courier,
    };
  }
}
