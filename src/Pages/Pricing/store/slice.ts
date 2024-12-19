import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialData,
  NewProfileData,
  PRICE_ADJUSTMENT_MODE,
  PRICE_INCREMENT_MODE,
  PricingAdjustmentOptions,
  pricingAdjustmentOptions,
  PricingIncrementOptions,
  pricingIncrementOptions,
  PricingProfileOption,
  pricingProfileOptions,
  Product,
  PROFILE_STATUS,
  PROFILE_TYPE,
  SearchQuery,
  SelectedProduct,
} from "./types";
import {
  fetchInitialData,
  fetchProductsData,
  fetchProfileProductData,
  saveProfileData,
} from "./action";
import { calculateNewPrice } from "../../../helper";
import { message } from 'antd';

interface PricingState {
  initialData: InitialData | null;
  selectedPricingProfile: PROFILE_TYPE | null;
  pricingProfileOptions: PricingProfileOption;
  selectedPricingAdjustmentMode: PRICE_ADJUSTMENT_MODE;
  pricingAdjustmentOptions: PricingAdjustmentOptions;
  selectedPricingIncrementMode: PRICE_INCREMENT_MODE;
  pricingIncrementOptions: PricingIncrementOptions;
  searchQuery: SearchQuery;
  searchProductData: Product[];
  selectedProducts: Product[];
  adjustedProductData: SelectedProduct[];
  newProfileData: NewProfileData;
  isComplete: boolean;
  selectedBasedOnPrice: string,
  productSelectionRadio:string,
}

const initialState: PricingState = {
  initialData: null,
  selectedPricingProfile: PROFILE_TYPE.ONE_PRODUCT,
  pricingProfileOptions: pricingProfileOptions,
  selectedPricingAdjustmentMode: PRICE_ADJUSTMENT_MODE.FIXED,
  pricingAdjustmentOptions: pricingAdjustmentOptions,
  selectedPricingIncrementMode: PRICE_INCREMENT_MODE.INCREASE,
  pricingIncrementOptions: pricingIncrementOptions,
  searchQuery: {
    searchString: "",
    category: "",
    segment: "",
    brand: "",
  },
  searchProductData: [],
  selectedProducts: [],
  adjustedProductData: [],
  newProfileData: {
    ProfileData: {
      id: "",
      name: "",
      expDate: new Date(),
      status: PROFILE_STATUS.NOT_COMPLETE,
      basedOn: null,
      adjustmentMode: null,
      increamentMode: null,
      isValid: false,
    },
    PriceDetails: [],
  },
  selectedBasedOnPrice: "",
  isComplete: false,
  productSelectionRadio: "none",
};

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setSelectedPricingProfile: (state, action: PayloadAction<PROFILE_TYPE>) => {
      state.selectedPricingProfile = action.payload;
    },
    setSelectedPricingAdjustmentMode: (
      state,
      action: PayloadAction<PRICE_ADJUSTMENT_MODE>
    ) => {
      state.selectedPricingAdjustmentMode = action.payload;
    },
    setSelectedPricingIncrementMode: (
      state,
      action: PayloadAction<PRICE_INCREMENT_MODE>
    ) => {
      state.selectedPricingIncrementMode = action.payload;
    },
    setSearchQuery: (
      state,
      action: PayloadAction<{ type: keyof SearchQuery; value: string }>
    ) => {
      const { type, value } = action.payload;
      state.searchQuery[type] = value;
    },
    toggleProductSelection: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.id;
      if (state.selectedProducts.some((product) => product.id === productId)) {
        state.selectedProducts = state.selectedProducts.filter(
          (product) => product.id !== productId
        );
      } else {
        state.selectedProducts.push(action.payload);
      }
    },
    selectAllProducts: (state) => {
      state.selectedProducts = state.searchProductData;
    },
    deselectAllProducts: (state) => {
      state.selectedProducts = [];
    },
    setIsComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },
    setBasedOnNewProductData: (state, action: PayloadAction<string>) => {
      const profileData = state.newProfileData.ProfileData;
      if (profileData) {
        profileData.basedOn = action.payload;
      }
    },
    setAdjustmentNewProductData: (
      state,
      action: PayloadAction<{ recordId: string; value: number }>
    ) => {
      const { recordId, value } = action.payload;
      const pricingDetails = state.newProfileData.PriceDetails;
      const adjustmentMode = state.selectedPricingAdjustmentMode;
      const incrementMode = state.selectedPricingIncrementMode;

      const product = pricingDetails.find((p) => p.productId === recordId);
      if (product) {
        product.adjustment = value;
        product.newAmount = calculateNewPrice({
          basedOnPrice: product.amount,
          adjustment: value,
          adjustmentMode: adjustmentMode,
          incrementMode: incrementMode,
        });
      }
    },
    setSelectedBasedOnPrice: (
      state,
      action: PayloadAction<string>
    ) => {
      state.selectedBasedOnPrice = action.payload;
    },
    setProductSelectionRadio: (
      state,
      action: PayloadAction<string>
    ) => {
      state.productSelectionRadio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, action: any) => {
        state.initialData = action.payload;
        state.newProfileData.ProfileData = action.payload.ProfileData;
      })
      .addCase(fetchInitialData.rejected, (state, _) => {
        state.initialData = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action: any) => {
        state.searchProductData = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, _) => {
        state.searchProductData = [];
      })
      .addCase(fetchProfileProductData.fulfilled, (state, action: any) => {
        state.newProfileData.PriceDetails = action.payload.pricingDetails;
      })
      .addCase(fetchProfileProductData.rejected, (state, _) => {
        state.newProfileData.PriceDetails = [];
      })
      .addCase(saveProfileData.fulfilled, (state, _) => {
        message.success('Profile saved successfully.')
      })
      .addCase(saveProfileData.rejected, (state, _) => {
        message.error('Failed to save Profile')
      });
  },
});

export const {
  setSelectedPricingProfile,
  setSelectedPricingAdjustmentMode,
  setSelectedPricingIncrementMode,
  toggleProductSelection,
  selectAllProducts,
  deselectAllProducts,
  setSearchQuery,
  setIsComplete,
  setAdjustmentNewProductData,
  setBasedOnNewProductData,
  setSelectedBasedOnPrice,
  setProductSelectionRadio
} = pricingSlice.actions;

export default pricingSlice.reducer;
