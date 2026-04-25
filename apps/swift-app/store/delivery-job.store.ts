import { create } from "zustand";
import { DeliveryJob, DeliveryStatus } from "@swift-route/types";

interface DeliveryJobState {
  // properties
  job: DeliveryJob | null;
  prevJob: DeliveryJob | null;
  loading: boolean;
  error: string | null;

  // actions
  setJob: (jobs: DeliveryJob) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  advanceJobStatus: (status: DeliveryStatus) => void;
  revertJobStatus: (error: string) => void;
}

export const useDeliveryJobStore = create<DeliveryJobState>((set, get) => ({
  // properties
  job: null,
  prevJob: null,
  loading: false,
  error: null,

  // actions
  setJob: (job) => set({ job }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  advanceJobStatus: (status) => {
    const job = get().job;
    set({
      prevJob: job,
      job: job != null
        ? {
          ...job,
          status,
        }
        : null,
    });
  },
  revertJobStatus: (error) => {
    const prevJob = get().prevJob;
    if (!prevJob) return;
    set({
      job: prevJob,
      prevJob: null,
      error,
    });
  },
}));
