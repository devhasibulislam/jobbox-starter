import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register an user
    register: builder.mutation({
      query: (data) => ({
        url: "user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(getUser(data.email));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // fetch all user
  }),
});

export const { useRegisterMutation } = authApi;
