import { DeliveryStatus, PackageType } from "./enums";

type DeliveryNote = {
  id: number;
  createdAt: Date;
  deliveryId: number;
  note: string;
};

type DeliveryJob = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  pickupAddress: string;
  dropoffAddress: string;
  packageType: PackageType;
  status: DeliveryStatus;
  notes: DeliveryNote[];
};

export type { DeliveryJob, DeliveryNote };
export { DeliveryStatus, PackageType };
