import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // post new job
    postJob: builder.mutation({
      query: (data) => ({
        url: "job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    // apply new job
    applyJob: builder.mutation({
      query: (data) => ({
        url: "apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    // fetch all jobs
    getJobs: builder.query({
      query: () => ({
        url: "jobs",
      }),
      providesTags: ["Job"],
    }),

    // fetch specific job
    getJob: builder.query({
      query: (id) => ({
        url: `job/${id}`,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useGetJobQuery,
  useApplyJobMutation,
} = authApi;
