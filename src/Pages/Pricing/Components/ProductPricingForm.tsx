import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectNewProfileData,
  selectPricingProfileOptions,
  selectSelectedPricingProfile,
} from "../store/selector";
import { useAppDispatch } from "../../../store";
import {
  deselectAllProducts,
  selectAllProducts,
  setIsComplete,
  setProductSelectionRadio,
  setSelectedPricingProfile,
} from "../store/slice";
import React, { useState } from "react";
import ProductSearch from "./ProductSearch";
import PriceAdjustment from "./PriceAdjustment";
import PriceTable from "./PriceTable";
import { PROFILE_TYPE } from "../store/types";

const ProductPricingForm = () => {
  const dispatch = useAppDispatch();
  const selectedPricingProfile = useSelector(selectSelectedPricingProfile);
  const pricingProfileOptions = useSelector(selectPricingProfileOptions);
  const newProfileData = useSelector(selectNewProfileData);
  const [error, setError] = useState(false);

  return (
    <ProductPricingFormWrapper>
      <p>You are creating a Pricing Profile for</p>
      <RadioGroup>
        {pricingProfileOptions.map((pricingProfile, index) => (
          <React.Fragment key={index}>
            <Label>
              <RadioInput
                type="radio"
                name="productSelection"
                value={pricingProfile.value}
                checked={pricingProfile.value === selectedPricingProfile}
                onChange={(e) => {
                  const selectedProfile = e.target.value;
                  if (Number(selectedProfile) === PROFILE_TYPE.ONE_PRODUCT) {
                    dispatch(deselectAllProducts());
                    dispatch(setProductSelectionRadio(""));
                  } else if (
                    Number(selectedProfile) === PROFILE_TYPE.ALL_PRODUCT
                  ) {
                    dispatch(setProductSelectionRadio("all"));
                    dispatch(selectAllProducts());
                  } else if (
                    Number(selectedProfile) === PROFILE_TYPE.MULTIPLE_PRODUCT
                  ) {
                    dispatch(setProductSelectionRadio("none"));
                    dispatch(deselectAllProducts());
                  }
                  dispatch(setSelectedPricingProfile(pricingProfile.value));
                }}
              />
              <CustomRadio
                checked={selectedPricingProfile === pricingProfile.value}
              />
              {pricingProfile.name}
            </Label>
            {index - 2 ? <Divider /> : <></>}
          </React.Fragment>
        ))}
      </RadioGroup>
      <p>Search for Products</p>
      <ProductSearch />
      <PriceAdjustment />
      <PriceTable />
      {error && (
        <Error>
          Please make sure "New Price" for products is not negative.
        </Error>
      )}
      <ButtonsDiv>
        <p>Your entries are saved automatically</p>
        <Buttons>
          <BackButton>Back</BackButton>
          <NextButton
            onClick={() => {
              const isError = newProfileData.PriceDetails.some(
                (profile) => profile.newAmount < 0
              );

              if (isError) {
                setError(true);
              } else {
                dispatch(setIsComplete(true));
              }
            }}
          >
            Next
          </NextButton>
        </Buttons>
      </ButtonsDiv>
    </ProductPricingFormWrapper>
  );
};

export default ProductPricingForm;

const ProductPricingFormWrapper = styled.div`
  font-size: 14px;
  color: #637381;

  p {
    margin-top: 28px;
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

const Divider = styled.div`
  border: 1px solid #f0f0f0;
  height: 18px;
  margin: 0 5px;
`;

const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 12px;
    font-weight: 400;
    margin: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #212b36;
  font-weight: 600;
  font-family: Inter;
  padding: 13px 16px;
  cursor: pointer;
  font-size: 14px;
`;

const NextButton = styled.button`
  max-width: 400px;
  min-width: 120px;
  font-weight: 600;
  font-size: 14px;
  font-family: Inter;
  background-color: #147d73;
  color: #ffffff;
  border-radius: 100px;
  border: none;
  padding: 13px 16px;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  display: flex;
  justify-content: center;
`;
