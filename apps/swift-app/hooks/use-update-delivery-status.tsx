import DeliveryJobsService from "@/services/delivery-jobs.service";
import { useDeliveryJobStore } from "@/store/delivery-job.store"
import { useDeliveryJobsStore } from "@/store/delivery-jobs.store";
import { DeliveryStatus } from "@swift-route/types";

const useUpdateDeliveryStatus = () => {
  const updateJobStatus = useDeliveryJobsStore((state) => state.advanceJobStatus);
  const revertJobStatus = useDeliveryJobsStore((state) => state.revertJobStatus);
  const updateJobStatusSI = useDeliveryJobStore((state) => state.advanceJobStatus);
  const revertJobStatusSI = useDeliveryJobStore((state) => state.revertJobStatus);

  const updateStatus = async (id: string, status: DeliveryStatus) => {
    // optimistically update status in both stores
    updateJobStatus(id, status);
    updateJobStatusSI(status);

    try {
      // call backend to updaate delivery status
      await DeliveryJobsService.advanceStatus(id, status);
    } catch (err) {
      // if API call fails, revert status in both stores and set error message
      const errMessage = err instanceof Error ? err.message : "Failed to update delivery status.";
      revertJobStatus(errMessage);
      revertJobStatusSI(errMessage);
    }
  }

  return { updateStatus }
}

export default useUpdateDeliveryStatus