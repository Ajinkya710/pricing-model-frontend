import { RootState } from "../../../store";

const selectSelectedPricingProfile = (state: RootState) =>
  state.pricing.selectedPricingProfile;

const selectPricingProfileOptions = (state: RootState) =>
  state.pricing.pricingProfileOptions;
const selectSelectedPricingAdjustmentMode = (state: RootState) =>
  state.pricing.selectedPricingAdjustmentMode;

const selectPricingAdjustmentOptions = (state: RootState) =>
  state.pricing.pricingAdjustmentOptions;
const selectSelectedPricingIncrementMode = (state: RootState) =>
  state.pricing.selectedPricingIncrementMode;

const selectPricingIncrementOptions = (state: RootState) =>
  state.pricing.pricingIncrementOptions;

const selectInitialData = (state: RootState) => state.pricing.initialData;

const selectSearchProductData = (state: RootState) => state.pricing.searchProductData;

const selectSelectedProducts = (state: RootState) => state.pricing.selectedProducts;

const selectNewProfileData = (state: RootState) => state.pricing.newProfileData;

const selectIsComplete = (state: RootState) => state.pricing.isComplete;

const selectBasedOnPrice = (state: RootState) => state.pricing.selectedBasedOnPrice;

const selectProductSelectionRadio = (state: RootState) => state.pricing.productSelectionRadio;

export {
  selectSelectedPricingProfile,
  selectPricingProfileOptions,
  selectSelectedPricingAdjustmentMode,
  selectPricingAdjustmentOptions,
  selectSelectedPricingIncrementMode,
  selectPricingIncrementOptions,
  selectInitialData,
  selectSearchProductData,
  selectSelectedProducts,
  selectNewProfileData,
  selectIsComplete,
  selectBasedOnPrice,
  selectProductSelectionRadio
};
