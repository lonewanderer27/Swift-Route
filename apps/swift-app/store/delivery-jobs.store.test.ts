import { DeliveryStatus } from "@swift-route/types";
import { useDeliveryJobsStore } from "./delivery-jobs.store";
import { deliveryJobsStore, JOB_IDS } from "@swift-route/seed-data";

// Resets the store to a known state so tests don't affect each other
beforeEach(() => {
  // get jobs from seed data and set to store before each test
  const jobs = deliveryJobsStore;

  // set the store state with the jobs from seed data
  useDeliveryJobsStore.setState({
    jobs: jobs,
    loading: false,
    error: null,
    prevJobs: null,
  });
});

// Optimistic update
it("should update job status optimistically", () => {
  // Let's use Sophia's assigned job for this test
  const jobId = JOB_IDS.sophia_assigned;

  // Advance Sophia's job status to IN_TRANSIT
  useDeliveryJobsStore
    .getState()
    .advanceJobStatus(jobId, DeliveryStatus.IN_TRANSIT);

  // We expect the job status to be updated immediately in the store
  const job = useDeliveryJobsStore.getState().jobs.find((j) => j.id === jobId);
  expect(job).toBeDefined();
  expect(job!.status).toBe(DeliveryStatus.IN_TRANSIT);
});
