import { api } from "../api";

const bookingApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({

    addBlog: builder.mutation({
      query: (blogvalue) => ({
        url: '/blog/addblog',
        method: "POST",
        body: blogvalue,
      }),
      invalidatesTags: ['blog'],
    }),   
 
    deleteBlog: builder.mutation({
      query: ({id}) => ({
        url: `/blog/deleteblog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['blog'],
    }),  

    getAllBlog: builder.query({
      query: () => ({
          url: '/blog/getblog',
          method: "GET",
      }),
      providesTags: ['blog'],
  
  }),

  updateBlog: builder.mutation({
    query: ({id,values}) => ({
      url: `/blog/updateblog/${id}`,
      method: "PUT",
        invalidatesTags: ['blog'],
      body:values
    }),
    invalidatesTags: ['blog'],
  }),

}),

});

export const {useAddBlogMutation, useGetAllBlogQuery, useDeleteBlogMutation, useUpdateBlogMutation} = bookingApi;
