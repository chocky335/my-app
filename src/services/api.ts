import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REHYDRATE} from 'redux-persist';
import { BASE_URL } from '../constants';

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === REHYDRATE) {
      if (action.payload?.[reducerPath]) {
        return action.payload[reducerPath];
      }
    }
  },
  endpoints: _ => ({}),
});
