const DeliveryStatus = {
  ASSIGNED: "assigned",
  IN_TRANSIT: "in-transit",
  DELIVERED: "delivered",
} as const;
// Fix for enums not being supported for some reason in boilerplate of NestJS + TypeScript 6.0.2
type DeliveryStatus = (typeof DeliveryStatus)[keyof typeof DeliveryStatus];

const PackageType = {
  DOCUMENT: "document",
  PERISHABLE: "perishable",
  FRAGILE: "fragile",
  APPLIANCE: "appliance",
  FURNITURE: "furniture",
} as const;
// Fix for enums not being supported for some reason in boilerplate of NestJS + TypeScript 6.0.2
type PackageType = (typeof PackageType)[keyof typeof PackageType];

type Courier = {
  id: string;
  name: string;
};

type DeliveryNote = {
  id: string;
  createdAt: Date;
  deliveryId: string;
  note: string;
};

type DeliveryJob = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  pickupAddress: string;
  dropoffAddress: string;
  packageType: PackageType;
  status: DeliveryStatus;
  notes: DeliveryNote[];
  courier: Courier;
};

export type { Courier, DeliveryJob, DeliveryNote };
export { DeliveryStatus, PackageType };
