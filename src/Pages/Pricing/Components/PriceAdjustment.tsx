import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import {
  selectBasedOnPrice,
  selectInitialData,
  selectPricingAdjustmentOptions,
  selectPricingIncrementOptions,
  selectSelectedPricingAdjustmentMode,
  selectSelectedPricingIncrementMode,
} from "../store/selector";
import {
  setBasedOnNewProductData,
  setSelectedBasedOnPrice,
  setSelectedPricingAdjustmentMode,
  setSelectedPricingIncrementMode,
} from "../store/slice";
import { ReactComponent as LightBulbIcon } from "../../../Assets/svg/LightbulbFilament.svg";
import { fetchProfileProductData } from "../store/action";

const PriceAdjustment = () => {
  const dispatch = useAppDispatch();
  const selectedPricingAdjustmentMode = useSelector(
    selectSelectedPricingAdjustmentMode
  );
  const selectedPricingIncrementMode = useSelector(
    selectSelectedPricingIncrementMode
  );
  const pricingAdjustmentOptions = useSelector(selectPricingAdjustmentOptions);
  const pricingIncrementOptions = useSelector(selectPricingIncrementOptions);
  const initialData = useSelector(selectInitialData);
  const basedOnOptions = initialData?.AllProfiles || [];
  const basedOnPrice = useSelector(selectBasedOnPrice);

  return (
    <div>
      <Divider />
      <p>Based On</p>
      <Dropdown
        id="based"
        value={basedOnPrice}
        onChange={async (e) => {
          if (e.target.value) {
            dispatch(setSelectedBasedOnPrice(e.target.value));
            await dispatch(fetchProfileProductData(e.target.value));
            dispatch(setBasedOnNewProductData(e.target.value));
          } else {
            dispatch(setSelectedBasedOnPrice(""));
          }
        }}
      >
        <option value="">Based on Price</option>
        {basedOnOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Dropdown>
      <p>Set Price Adjustment Mode</p>
      <RadioGroup>
        {pricingAdjustmentOptions.map((adjustmentMode, index) => (
          <React.Fragment key={index}>
            <Label>
              <RadioInput
                type="radio"
                name="productSelection"
                value={adjustmentMode.value}
                checked={adjustmentMode.value === selectedPricingAdjustmentMode}
                onChange={() =>
                  dispatch(
                    setSelectedPricingAdjustmentMode(adjustmentMode.value)
                  )
                }
              />
              <CustomRadio
                checked={selectedPricingAdjustmentMode === adjustmentMode.value}
              />
              {adjustmentMode.name}
            </Label>
            {index - 1 ? <OptionDivider /> : <></>}
          </React.Fragment>
        ))}
      </RadioGroup>
      <p>Set Price Adjustment Increment Mode </p>
      <RadioGroup>
        {pricingIncrementOptions.map((incrementOption, index) => (
          <React.Fragment key={index}>
            <Label>
              <RadioInput
                type="radio"
                name="productSelection"
                value={incrementOption.value}
                checked={incrementOption.value === selectedPricingIncrementMode}
                onChange={() =>
                  dispatch(
                    setSelectedPricingIncrementMode(incrementOption.value)
                  )
                }
              />
              <CustomRadio
                checked={selectedPricingIncrementMode === incrementOption.value}
              />
              {incrementOption.name}
            </Label>
            {index - 1 ? <OptionDivider /> : <></>}
          </React.Fragment>
        ))}
      </RadioGroup>
      <WarningDiv>
        <LightBulbIcon />
        <CustomText>
          The adjusted price will be calculated from
          <span>
            {` ${basedOnOptions.find((o) => o.id === basedOnPrice)?.name ?? ""} `}
          </span>
          selected above
        </CustomText>
      </WarningDiv>
    </div>
  );
};

export default PriceAdjustment;

const Divider = styled.div`
  border-bottom: 1px solid #f0f0f0;
  margin: 26px 0 13px;
`;

const Dropdown = styled.select`
  font-size: 16px;
  border: 1px solid #ccc;
  width: 100%;
  height: 48px;
  max-width: 400px;
  border-radius: 8px;
  font-family: "Inter";
  color: #667085;
  &:focus {
    outline: none;
    border-color: #08822a;
  }
`;

export const RadioInput = styled.input`
  display: none;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 26px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CustomRadio = styled.span<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #08822a;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  background-color: ${({ checked }) => (checked ? "#08822A" : "transparent")};

  &::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ checked }) => (checked ? "#F4FFF7" : "transparent")};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CustomText = styled.p`
  color: #a26306;

  span {
    color: #212b36;
    font-weight: 500;
  }
`;

const OptionDivider = styled.div`
  border: 1px solid #f0f0f0;
  height: 18px;
  margin: 0 5px;
`;

const WarningDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    margin: 0 !important;
  }
`;
