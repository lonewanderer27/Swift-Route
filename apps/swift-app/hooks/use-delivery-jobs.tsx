import DeliveryJobsService from "@/services/delivery-jobs.service";
import { useDeliveryJobsStore } from "@/store/delivery-jobs.store"
import { DeliveryStatus } from "@swift-route/types"
import { useEffect } from "react";

const useDeliveryJobs = (courierId: string, status?: DeliveryStatus) => {
  const { jobs, loading, error, setJobs, setLoading, setError } = useDeliveryJobsStore();

  async function fetchJobs() {
    setLoading(true);

    try {
      /*
        ideally it should use getDeliveryJobs
        but we need to provide a courierId in this specific scenario
        hence I named it getCourierJobs, since we are indeed
        fetching the jobs of a specific courier
      */
      const result = await DeliveryJobsService.getCourierJobs(courierId, status);
      setJobs(result);
    } catch (err) {
      setError("Failed to load delivery jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [courierId, status])

  return {
    jobs, loading, error,
    refetch: fetchJobs
  }
}

export default useDeliveryJobs