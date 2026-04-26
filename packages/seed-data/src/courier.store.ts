import type { Courier } from "@swift-route/types";
import { COURIER_IDS } from "./job-ids";

export const courierStore: Courier[] = [
  { id: COURIER_IDS.jungkook, name: "Jeon Jung-kook" },
  { id: COURIER_IDS.sophia, name: "Sophia Laforteza" },
  { id: COURIER_IDS.chris, name: "Christopher Bang" },
];
