import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Replace this URL with : 'https://api.coingecko.com/api/v3/coins/market'

const url = 'https://apii.coingecko.com/api/v3/coins/markets'

const handleApi = createApi({
  reducerPath: 'handleApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    fetchList: builder.mutation({
      query: (requestData) => ({
        url: `?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
      
        },
      }),
    }),
  }),
});

export const { useFetchListMutation } = handleApi;
export default handleApi;
