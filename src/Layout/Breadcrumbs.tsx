import React from "react";
import styled from "styled-components";
import { ReactComponent as BreadcrumbArrow } from "../Assets/svg/BreadcrumbArrow.svg";

type BreadcrumbProps = {
  items: string[];
  description?: string;
};

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, description }) => {
  return (
    <BreadcrumbWrapper>
      <BreadcrumbItems>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {<span>{item}</span>}
            {index < items.length - 1 && <BreadcrumbArrow />}
          </React.Fragment>
        ))}
      </BreadcrumbItems>
      {description && (
        <BreadcrumbDescription>{description}</BreadcrumbDescription>
      )}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumbs;

const BreadcrumbWrapper = styled.div`
  color: #637381;
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
  }
`;


const BreadcrumbItems = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span:last-child {
    font-weight: 500;
    color: #212b36;
  }
`;

const BreadcrumbDescription = styled.p`
  font-size: 14px;
  color: #637381;
`;
