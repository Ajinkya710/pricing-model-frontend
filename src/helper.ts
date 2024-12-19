import moment from "moment";
import {
  PRICE_ADJUSTMENT_MODE,
  PRICE_INCREMENT_MODE,
} from "./Pages/Pricing/store/types";

interface PriceCalculationParams {
  basedOnPrice: number;
  adjustment: number;
  adjustmentMode: PRICE_ADJUSTMENT_MODE;
  incrementMode: PRICE_INCREMENT_MODE;
}

const getDaysUntilExpiry = (
  expDate: string | Date | undefined
): number | null => {
  if (!expDate || !moment(expDate).isValid()) {
    return null;
  }

  // Calculate the difference in days between current date and expDate
  const expiryMoment = moment(expDate);
  const today = moment();
  const daysRemaining = expiryMoment.diff(today, "days");

  return daysRemaining;
};

const calculateNewPrice = ({
  basedOnPrice,
  adjustment,
  adjustmentMode,
  incrementMode,
}: PriceCalculationParams): number => {
  let newPrice = basedOnPrice;

  if (adjustmentMode === PRICE_ADJUSTMENT_MODE.FIXED) {
    // Fixed adjustment formula
    newPrice =
      incrementMode === PRICE_INCREMENT_MODE.INCREASE
        ? basedOnPrice + adjustment
        : basedOnPrice - adjustment;
  } else if (adjustmentMode === PRICE_ADJUSTMENT_MODE.DYNAMIC) {
    // Dynamic adjustment formula
    const adjustmentValue = (adjustment / 100) * basedOnPrice;
    newPrice =
      incrementMode === PRICE_INCREMENT_MODE.INCREASE
        ? basedOnPrice + adjustmentValue
        : basedOnPrice - adjustmentValue;
  }

  return parseFloat(newPrice.toFixed(2));
};

export { getDaysUntilExpiry, calculateNewPrice };
