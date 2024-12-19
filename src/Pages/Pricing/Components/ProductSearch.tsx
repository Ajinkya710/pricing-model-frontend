import React from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../../../Assets/svg/Search.svg";
import { selectInitialData } from "../store/selector";
import { useSelector } from "react-redux";
import { fetchProductsData } from "../store/action";
import { useAppDispatch } from "../../../store";
import ProductsDisplay from "./ProductsDisplay";
import { setSearchQuery } from "../store/slice";

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const initialData = useSelector(selectInitialData);
  const categories = initialData?.InitialData.Categories || [];
  const segments = initialData?.InitialData.Segments || [];
  const brands = initialData?.InitialData.Brands || [];

  return (
    <React.Fragment>
      <ProductSearchWrapper>
        <SearchBarContainer>
          <SearchIcon />
          <SearchBar
            id="searchBar"
            type="text"
            placeholder="Search Product / SKU"
            onChange={async (e) => {
              dispatch(
                setSearchQuery({ type: "searchString", value: e.target.value })
              );
              await dispatch(fetchProductsData());
            }}
          />
        </SearchBarContainer>
        <div>
          <Dropdown
            id="category"
            onChange={async (e) => {
              dispatch(
                setSearchQuery({ type: "category", value: e.target.value })
              );
              await dispatch(fetchProductsData());
            }}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <React.Fragment key={category.id}>
                <option value={category.id}>{category.name}</option>
                {category.subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {`-- ${subCategory.name}`}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </Dropdown>
        </div>
        <div>
          <Dropdown
            id="segment"
            onChange={async (e) => {
              dispatch(
                setSearchQuery({ type: "segment", value: e.target.value })
              );
              await dispatch(fetchProductsData());
            }}
          >
            <option value="">Select Segment</option>
            {segments.map((segment) => (
              <option key={segment.id} value={segment.id}>
                {segment.name}
              </option>
            ))}
          </Dropdown>
        </div>
        <div>
          <Dropdown
            id="brand"
            onChange={async (e) => {
              dispatch(
                setSearchQuery({ type: "brand", value: e.target.value })
              );
              await dispatch(fetchProductsData());
            }}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Dropdown>
        </div>
      </ProductSearchWrapper>
      <ProductsDisplay />
    </React.Fragment>
  );
};

export default ProductSearch;

const ProductSearchWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 996px) {
    grid-template-columns: 1fr;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 48px;
  font-size: 16px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-family: "Inter";

  &:focus {
    outline: none;
    border-color: #08822a;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
`;

const Dropdown = styled.select`
  font-size: 16px;
  border: 1px solid #ccc;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-family: "Inter";
  color: #667085;
  &:focus {
    outline: none;
    border-color: #08822a;
  }
`;
