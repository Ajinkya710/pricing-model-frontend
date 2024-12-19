import React from "react";
import { useSelector } from "react-redux";
import {
  selectInitialData,
  selectProductSelectionRadio,
  selectSearchProductData,
  selectSelectedPricingProfile,
  selectSelectedProducts,
} from "../store/selector";
import styled from "styled-components";
import { ReactComponent as SampleProductImage } from "../../../Assets/svg/SampleProductImage.svg";
import { useAppDispatch } from "../../../store";
import {
  deselectAllProducts,
  selectAllProducts,
  setProductSelectionRadio,
  toggleProductSelection,
} from "../store/slice";
import { PROFILE_TYPE } from "../store/types";

const ProductsDisplay = () => {
  const dispatch = useAppDispatch();
  const searchProductData = useSelector(selectSearchProductData);
  const productSelection = useSelector(selectProductSelectionRadio);
  const selectedProducts = useSelector(selectSelectedProducts);
  const selectedPricingProfile = useSelector(selectSelectedPricingProfile);
  const initialData = useSelector(selectInitialData);
  const profileData = initialData?.ProfileData;

  const handleProductSelect = (productId: string) => {
    const product = searchProductData.find(
      (product) => product.id === productId
    );
    if (product) {
      dispatch(toggleProductSelection(product));
    }
  };

  return (
    <React.Fragment>
      <p>
        Showing {searchProductData.length} Results for Product Name or SKU Code
      </p>
      <RadioGroup>
        <Label
          disabled={
            selectedPricingProfile === PROFILE_TYPE.ONE_PRODUCT ||
            selectedPricingProfile === PROFILE_TYPE.ALL_PRODUCT
          }
        >
          <RadioInput
            type="radio"
            name="productSelection"
            value={"none"}
            checked={productSelection === "none"}
            disabled={
              selectedPricingProfile === PROFILE_TYPE.ONE_PRODUCT ||
              selectedPricingProfile === PROFILE_TYPE.ALL_PRODUCT
            }
            onChange={() => {
              dispatch(setProductSelectionRadio("none"));
              dispatch(deselectAllProducts());
            }}
          />
          <CustomRadio
            checked={productSelection === "none"}
            disabled={
              selectedPricingProfile === PROFILE_TYPE.ONE_PRODUCT ||
              selectedPricingProfile === PROFILE_TYPE.ALL_PRODUCT
            }
          />
          Deselect All
        </Label>
        <Divider />
        <Label disabled={selectedPricingProfile === PROFILE_TYPE.ONE_PRODUCT}>
          <RadioInput
            type="radio"
            name="productSelection"
            value={"all"}
            checked={productSelection === "all"}
            disabled={selectedPricingProfile === PROFILE_TYPE.ONE_PRODUCT}
            onChange={() => {
              dispatch(setProductSelectionRadio("all"));
              dispatch(selectAllProducts());
            }}
          />
          <CustomRadio
            checked={productSelection === "all"}
            disabled={selectedPricingProfile === PROFILE_TYPE.ONE_PRODUCT}
          />
          Select All
        </Label>
      </RadioGroup>
      <ProductsDisplayWrapper>
        {searchProductData.map((product) => (
          <ProductCard key={product.id}>
            <CheckboxWrapper>
              <StyledCheckbox
                type="checkbox"
                checked={selectedProducts.some((p) => p.id === product.id)}
                onChange={() => {
                  if (selectedPricingProfile === PROFILE_TYPE.ONE_PRODUCT) {
                    dispatch(deselectAllProducts());
                    handleProductSelect(product.id);
                  } else {
                    handleProductSelect(product.id);
                  }
                }}
                id={`checkbox-${product.id}`}
              />
            </CheckboxWrapper>
            <ImageBox>
              <SampleProductImage />
            </ImageBox>
            <ProductDescription>
              <p>{product.title}</p>
              <div>
                <p>{product.skuCode}</p>
                <Divider />
                <p>Quantity x Size</p>
              </div>
            </ProductDescription>
          </ProductCard>
        ))}
      </ProductsDisplayWrapper>
      <p>
        You’ve selected <b>{selectedProducts.length} Products</b>, these will be
        added to <b>{`${profileData?.name ?? ""}`}</b>
      </p>
    </React.Fragment>
  );
};

export default ProductsDisplay;

const ProductsDisplayWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  }
`;

const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    margin: 0 !important;
  }

  div {
    display: flex;
    gap: 6px;

    p {
      margin: 0;

      &:first-child {
        font-size: 12px;
        color: #637381;
      }

      &:last-child {
        font-size: 12px;
        color: #212b36;
        font-weight: 500;
      }
    }
  }
`;

const ImageBox = styled.div`
  height: 50px;
  width: 50px;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  border-left: 1px solid #f0f0f0;
  margin: 0 10px;
  height: 18px;
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

export const Label = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const CustomRadio = styled.span<{
  checked: boolean;
  disabled?: boolean;
}>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #08822a;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  background-color: ${({ checked }) => (checked ? "#08822A" : "transparent")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #b2c4d4;
  border-radius: 3px;
  background-color: transparent;
  appearance: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #08822a;
    border: 1px solid #f4fff7;
  }
`;
