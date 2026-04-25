import {
  Courier,
  DeliveryJob,
  DeliveryNote,
  DeliveryStatus,
  PackageType,
} from "@swift-route/types";
import { randomUUID } from "crypto";

export type PatchDeliveryJobInput = {
  pickup_address?: string;
  dropoff_address?: string;
  package_type?: PackageType;
  status?: DeliveryStatus;
  courier?: string;
  notes?: string[];
};

export class PatchDeliveryJobModel implements DeliveryJob {
  public id: string;
  public pickupAddress: string;
  public dropoffAddress: string;
  public packageType: PackageType;
  public status: DeliveryStatus;
  public notes: DeliveryNote[];
  public courier: Courier;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    prev: DeliveryJob,
    input: PatchDeliveryJobInput,
  ) {
    this.id = prev.id;
    this.pickupAddress = input.pickup_address ?? prev.pickupAddress;
    this.dropoffAddress = input.dropoff_address ?? prev.dropoffAddress;
    this.packageType = input.package_type ?? prev.packageType;
    this.status = input.status ?? prev.status;
    this.createdAt = prev.createdAt;
    this.updatedAt = new Date();

    // Transform note strings → DeliveryNote objects
    this.notes = (input.notes ?? prev.notes).map((note) => ({
      id: randomUUID(),
      createdAt: new Date(),
      deliveryId: this.id,
      note: note,
    }));

    // Transform courier name -> Courier object
    this.courier = input.courier
      ? {
        id: randomUUID(),
        name: input.courier,
      }
      : prev.courier;
  }
}
