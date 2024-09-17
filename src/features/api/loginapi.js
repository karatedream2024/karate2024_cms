import { api } from "../api";

const userApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({

    userRegister: builder.mutation({
      query: (attenvalue) => ({
        url: '/user/userregister',
        method: "POST",
        body: attenvalue,
      }),
      invalidatesTags: ['Atten'],
    }),   
    checkUser: builder.mutation({
      query: (getatten) => ({
        url: '/user/getuser',
        method: "POST",
        body: getatten,
      }),
      invalidatesTags: ['Atten'],
    }),   
}),

});

export const {useUserRegisterMutation, useCheckUserMutation} = userApi;
