import DeliveryJobsService from "@/services/delivery-jobs.service";
import { useDeliveryJobStore } from "@/store/delivery-job.store";


const useDeliveryJob = (jobId: string) => {
  const { job, loading, error, setJob, setLoading, setError } = useDeliveryJobStore();

  async function fetchJob() {
    setLoading(true);

    try {
      const result = await DeliveryJobsService.getJob(jobId);
      setJob(result);
    } catch (err) {
      setError("Failed to load delivery job.");
    } finally {
      setLoading(false);
    }
  }

  return {
    job, loading, error,
    refetch: fetchJob
  }

  // return useDeliveryJobsStore((state) =>
  //   state.jobs.find((job) => job.id === jobId))
}

export default useDeliveryJob;