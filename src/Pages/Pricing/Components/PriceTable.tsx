import React from "react";
import styled from "styled-components";
import { ReactComponent as RefreshIcon } from "../../../Assets/svg/RefreshIcon.svg";
import { useSelector } from "react-redux";
import {
  selectBasedOnPrice,
  selectInitialData,
  selectNewProfileData,
  selectSelectedPricingAdjustmentMode,
  selectSelectedPricingIncrementMode,
  selectSelectedProducts,
} from "../store/selector";
import { PRICE_ADJUSTMENT_MODE, PRICE_INCREMENT_MODE } from "../store/types";
import { setAdjustmentNewProductData } from "../store/slice";
import { useAppDispatch } from "../../../store";
const PriceTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useSelector(selectSelectedProducts);
  const initialData = useSelector(selectInitialData);
  const selectedPricingAdjustmentMode = useSelector(
    selectSelectedPricingAdjustmentMode
  );
  const selectedPricingIncrementMode = useSelector(
    selectSelectedPricingIncrementMode
  );

  const newProfileData = useSelector(selectNewProfileData);
  const basedOnOptions = initialData?.AllProfiles || [];
  const basedOnPrice = useSelector(selectBasedOnPrice);

  return (
    <TableWrapper>
      <RefreshDiv>
        <p>
          ** Note: All the products not selected above will be saved with
          <span>
            {` ${basedOnOptions.find((o) => o.id === basedOnPrice)?.name ?? ""} `}
          </span>{" "}
          price
        </p>
        <RefreshButton>
          <span>Refresh New Price Table</span>
          <RefreshIcon />
        </RefreshButton>
      </RefreshDiv>
      <table>
        <thead>
          <tr>
            <th>
              <CheckboxWrapper>
                <StyledCheckbox type="checkbox" />
              </CheckboxWrapper>
            </th>
            <th>Product Title</th>
            <th>SKU Code</th>
            <th>Category</th>
            <th>Based on Price</th>
            <th>Adjustment</th>
            <th>New Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <CheckboxWrapper>
                    <StyledCheckbox type="checkbox" />
                  </CheckboxWrapper>
                </td>
                <td>{product.title}</td>
                <td>{product.skuCode}</td>
                <td>
                  {
                    initialData?.InitialData.Categories.find(
                      (d) => d.id === product.categoryId
                    )?.name
                  }
                </td>
                <td>
                  $
                  {
                    newProfileData.PriceDetails.find(
                      (data) => data.productId === product.id
                    )?.amount
                  }
                </td>
                <td>
                  {selectedPricingIncrementMode ===
                  PRICE_INCREMENT_MODE.INCREASE
                    ? "+"
                    : "-"}
                  {selectedPricingAdjustmentMode === PRICE_ADJUSTMENT_MODE.FIXED
                    ? "$"
                    : "%"}
                  <input
                    type="number"
                    min={0}
                    value={
                      newProfileData.PriceDetails.find(
                        (d) => d.productId === product.id
                      )?.adjustment ?? ""
                    }
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      dispatch(
                        setAdjustmentNewProductData({
                          recordId: product.id,
                          value,
                        })
                      );
                    }}
                  />
                </td>
                <td>
                  $
                  {
                    newProfileData.PriceDetails.find(
                      (data) => data.productId === product.id
                    )?.newAmount
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedProducts.length === 0 && (
        <NoProducts>No products selected</NoProducts>
      )}
    </TableWrapper>
  );
};

export default PriceTable;

const RefreshDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  span {
    color: #212b36;
    font-weight: 500;
  }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th {
      border: none;
      padding: 12px;
      background: none;
      color: #637381;
      font-size: 14px;
      font-weight: 400;

      &: first-child {
        width: 25px;
      }
      &: last-child {
        color: #212b36;
        font-weight: 500;
      }
    }

    td {
      border: 1px solid #f0f0f0;
      padding: 12px;
      color: #212b36;
      font-size: 14px;
      font-weight: 500;

      &: nth-child(5) {
        color: #637381;
      }

      input[type="number"] {
        border: none;
      }
    }

    td {
      background-color: #ffffff;
    }

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    input[type="number"] {
      width: 80px;
      padding: 6px;
      border: 1px solid #d0d5dd;
      border-radius: 4px;
      font-size: 14px;
    }

    input[type="number"]:focus {
      outline: none;
      border-color: #08822a;
    }
  }
`;

const RefreshButton = styled.button`
  background-color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  cursor: pointer;

  > span {
    font-family: "Inter";
    color: #563fe3;
    font-weight: 600;
    font-size: 14px;
  }
`;

const NoProducts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #212b36;
  padding-top: 26px;
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
