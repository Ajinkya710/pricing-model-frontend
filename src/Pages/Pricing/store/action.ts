import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialData } from "./types";
import axios from "axios";
import { RootState } from "../../../store";
import API_URL from "../../../http";

export const fetchInitialData = createAsyncThunk<InitialData>(
  "fetchInitialData",
  async () => {
    const response = await axios.get(`${API_URL}/api/pricing/initial-data`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }
);

export const fetchProductsData = createAsyncThunk<
  InitialData,
  void,
  { state: RootState }
>("fetchProductsData", async (_, { getState }) => {
  const state = getState();
  const { searchString, category, segment, brand } = state.pricing.searchQuery;

  const response = await axios.get(`${API_URL}/api/products`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      search: searchString,
      category,
      segment,
      brand,
    },
  });

  return response.data;
});

export const fetchProfileProductData = createAsyncThunk<InitialData, string>(
  "fetchProfileProductData",
  async (id: string) => {
    const response = await axios.get(`${API_URL}/api/profile/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }
);

export const saveProfileData = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("saveProfileData", async (id, { getState }) => {
  const state = getState();
  const data = state.pricing.newProfileData;
  const profileData = data.ProfileData;
  const pricingData = data.PriceDetails;
  const adjustmentMode = state.pricing.selectedPricingAdjustmentMode;
  const increamentMode = state.pricing.selectedPricingIncrementMode;
  const profileId = state.pricing.initialData?.ProfileData.id;

  const newPricingData = pricingData.map((data) => ({
    ...data,
    profileId,
  }));

  const newProfileData = {
    ...profileData,
    adjustmentMode,
    increamentMode,
  };

  const newData = {
    ...data,
    ProfileData: newProfileData,
    PriceDetails: newPricingData,
  };

  const response = await axios.post(`${API_URL}/api/profile/${id}`, newData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
});
