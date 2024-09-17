import { api } from "../api";

const attenApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({

    addUpdateAtten: builder.mutation({
      query: (attenvalue) => ({
        url: '/atten/postupdateatten',
        method: "POST",
        body: attenvalue,
      }),
      invalidatesTags: ['Atten'],
    }),   
    getAttenValue: builder.mutation({
      query: (getatten) => ({
        url: '/atten/getatten',
        method: "POST",
        body: getatten,
      }),
      invalidatesTags: ['Atten'],
    }),   



 



}),

});

export const {useAddUpdateAttenMutation, useGetAttenValueMutation} = attenApi;
