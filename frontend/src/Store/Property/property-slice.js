import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  // Slice Name
  name: "property",
  // initial state for property slice
  initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {}, // Parameters used to search
    error: null, //  Error State
    loading: false, // loading state for the property
  },
  // contains functions to control various actions(state updates)
  reducers: {
    getRequest(state) {
      state.loading = true;
    },

    // Actions to update properties state with fetch data
    getProperties(state, action) {
      state.properties = action.payload.data;
      state.totalProperties = action.payload.all_properties;
      state.loading = false; // fetched all the properties successfully
    },

    // Action to update search parameters
    // Whatever we will search accordingly all the properties will come
    updateSearchParams: (state, action) => {
      state.searchParams =
        Object.keys(action.payload).length === 0
          ? {}
          : {
              ...state.searchParams,
              ...action.payload,
            };
    },

    // Action to update error state
    getErrors(state, action) {
      state.error = action.payload;
    },
  },
});

export const propertyAction = propertySlice.actions;

export default propertySlice;
