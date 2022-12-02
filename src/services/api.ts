import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REHYDRATE} from 'redux-persist';
import { BASE_URL } from '../constants';
import { MOCK_USER } from '../mocks';

export interface Hair {
  color: string;
  type: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}
  export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair
  domain: string;
  ip: string;
  address: Address
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

interface UsersFetch {
  users: User[]
}

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
  endpoints: build => ({
    fetchUsers: build.query<UsersFetch, void>({
      query: () => '/users',
    }),
    addUser: build.mutation<void, User['image']>({
      query: () => '/addUser',
      async onQueryStarted(userImage, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          commonApi.util.updateQueryData(
            'fetchUsers',
            undefined,
            (draft: UsersFetch) => {
              const users = draft?.users ?? []
              const newUser = {
                ...MOCK_USER,
                id: users.length > 0
                  ? Math.max(...draft.users.map(({id}) => id)) + 1
                  : MOCK_USER.id,
                image: userImage || MOCK_USER.image
              }
              users.unshift(newUser)

              return users.length <= 1 ? {users} : draft;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    removeUser: build.mutation<void, User['id']>({
      query: (id: number) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          commonApi.util.updateQueryData(
            'fetchUsers',
            undefined,
            (draft: UsersFetch) => {
              return {users: draft.users.filter(cartItem => cartItem.id !== id)};
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
  })
});

export const {useFetchUsersQuery, useRemoveUserMutation, useAddUserMutation} = commonApi;