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
    }),

    // fetch all jobs
    getJobs: builder.query({
      query: () => ({
        url: "jobs",
      }),
    }),

    // fetch specific job
    getJob: builder.query({
      query: (id) => ({
        url: `job/${id}`,
      }),
    }),
  }),
});

export const { usePostJobMutation, useGetJobsQuery, useGetJobQuery } = authApi;
