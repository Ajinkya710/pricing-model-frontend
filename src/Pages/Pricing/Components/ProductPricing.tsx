import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../../Assets/svg/EditIcon.svg";
import ProductPricingForm from "./ProductPricingForm";
import { useSelector } from "react-redux";
import {
  selectIsComplete,
  selectNewProfileData,
  selectSelectedPricingAdjustmentMode,
  selectSelectedPricingIncrementMode,
  selectSelectedProducts,
} from "../store/selector";
import React from "react";
import { setIsComplete } from "../store/slice";
import { useAppDispatch } from "../../../store";
import { PRICE_ADJUSTMENT_MODE, PRICE_INCREMENT_MODE } from "../store/types";
import { ReactComponent as SampleProductImage } from "../../../Assets/svg/SampleProductImage.svg";
import { saveProfileData } from "../store/action";

const ProductPricing = () => {
  const dispatch = useAppDispatch();
  const isComplete = useSelector(selectIsComplete);
  const selectedProducts = useSelector(selectSelectedProducts);
  const selectedPricingAdjustmentMode = useSelector(
    selectSelectedPricingAdjustmentMode
  );
  const selectedPricingIncrementMode = useSelector(
    selectSelectedPricingIncrementMode
  );
  const newProfileData = useSelector(selectNewProfileData);

  return (
    <ProductPricingWrapper>
      <DescriptionBox>
        <div>
          <p>Set Product Pricing</p>
          <p>Cheeky little description goes in here</p>
        </div>
        {isComplete && (
          <CompleteButton>
            <GreenStatus />
            <p>Completed</p>
          </CompleteButton>
        )}
      </DescriptionBox>
      <Divider />
      {isComplete ? (
        <React.Fragment>
          <DescriptionBox>
            <div>
              <p>You’ve selected {selectedProducts.length} Products</p>
              <DisplayProducts>
                <ImageBox>
                  <SampleProductImage />
                </ImageBox>
                {selectedProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <span> {product.title.split(" ")[0]}</span>
                    {index < selectedProducts.length - 2 && <span>,</span>}
                    {index === selectedProducts.length - 2 && <span> & </span>}
                  </React.Fragment>
                ))}
              </DisplayProducts>
              <p>
                With Price Adjustment Mode set to{" "}
                <span>
                  {selectedPricingAdjustmentMode ===
                  PRICE_ADJUSTMENT_MODE.DYNAMIC
                    ? "Dynamic"
                    : "Fixed"}{" "}
                </span>
                <span>
                  {selectedPricingIncrementMode ===
                  PRICE_INCREMENT_MODE.DECREASE
                    ? "Decrese"
                    : "Increase"}
                </span>
              </p>
            </div>
            <EditButton onClick={() => dispatch(setIsComplete(false))}>
              <EditIcon />
              <span>Make Changes</span>
            </EditButton>
          </DescriptionBox>
          <ButtonsDiv>
            <p>Your entries are saved automatically</p>
            <Buttons>
              <BackButton onClick={() => dispatch(setIsComplete(false))}>
                Back
              </BackButton>
              <NextButton
                onClick={() => {
                  dispatch(saveProfileData(newProfileData.ProfileData.id));
                }}
              >
                Save & Publish Profile
              </NextButton>
            </Buttons>
          </ButtonsDiv>
        </React.Fragment>
      ) : (
        <ProductPricingForm />
      )}
    </ProductPricingWrapper>
  );
};

export default ProductPricing;

const ProductPricingWrapper = styled.div`
  background: #ffffff;
  padding: 26px;
  border-radius: 8px;
  margin-top: 26px;
`;

const DescriptionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;

  p {
    color: #637381;
    font-size: 12px;
    span {
      font-weight: 500;
      color: #212b36;
    }
  }
  &:first-child {
    div > p:last-child {
      color: #637381;
      font-size: 14px;
      font-weight: 400;
    }

    div:nth-of-type(2) > p: last-child {
      font-size: 14px;
      color: #08822a;
    }
  }

  &:last-child {
    p:nth-child(1),
    p:nth-child(3) {
      color: #637381;
      font-size: 12px;
      font-weight: 400;

      > span {
        font-weight: 500;
        color: #212b36;
      }
    }
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid #f0f0f0;
  margin: 13px 0;
`;

const GreenStatus = styled.div`
  background-color: #08822a;
  height: 10px;
  width: 10px;
  border: 1.5px solid #ffffff;
  border-radius: 50%;
`;

const CompleteButton = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const EditButton = styled.button`
  background-color: #ffffff;
  border: 0.25px solid #f0f0f0;
  border-radius: 100px;
  max-height: 48px;
  padding: 13px;
  min-width: 120px;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  > span {
    font-family: "Inter";
    color: #212b36;
    font-weight: 600;
    font-size: 14px;
  }
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

const ImageBox = styled.div`
  height: 50px;
  width: 50px;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DisplayProducts = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
