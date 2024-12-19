import styled from "styled-components";

const AssignCustomer = () => {
  return (
    <AssignCustomerWrapper>
      <DescriptionBox>
        <div>
          <p>Assign Customers to Pricing Profile</p>
          <p>Choose which customers this profile will be applied to</p>
        </div>
        <NotStartedButton>
          <GrayStatus />
          <p>Not Started</p>
        </NotStartedButton>
      </DescriptionBox>
    </AssignCustomerWrapper>
  );
};

export default AssignCustomer;

const AssignCustomerWrapper = styled.div`
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
  div > p:last-child {
    color: #637381;
    font-size: 14px;
    font-weight: 400;
  }

  div:nth-of-type(2) > p: last-child {
    font-size: 14px;
    color: #212b36;
  }
`;

const GrayStatus = styled.div`
  background-color: #212b36;
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

const NotStartedButton = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
