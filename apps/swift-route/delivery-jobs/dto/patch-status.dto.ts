import {
  Courier,
  DeliveryJob,
  DeliveryNote,
  DeliveryStatus,
  PackageType,
} from "@swift-route/types";

export type PatchStatusInput = {
  status: DeliveryStatus;
};

export class PatchStatusModel implements DeliveryJob {
  public id: string;
  public pickupAddress: string;
  public dropoffAddress: string;
  public packageType: PackageType;
  public status: DeliveryStatus;
  public notes: DeliveryNote[];
  public courier: Courier;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(prev: DeliveryJob, input: PatchStatusInput) {
    this.id = prev.id;
    this.pickupAddress = prev.pickupAddress;
    this.dropoffAddress = prev.dropoffAddress;
    this.packageType = prev.packageType;
    this.status = input.status;
    this.createdAt = prev.createdAt;
    this.updatedAt = new Date();
    this.notes = prev.notes;
    this.courier = prev.courier;
  }
}
