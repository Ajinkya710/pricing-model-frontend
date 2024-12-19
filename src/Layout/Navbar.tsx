import moment from "moment";
import React from "react";
import styled from "styled-components";
import ProfilePicture from "../Assets/images/ProfilePicture.png";
import { ReactComponent as BellLogo } from "../Assets/svg/Navbar/Bell.svg";
import { ReactComponent as QuestionLogo } from "../Assets/svg/Navbar/Question.svg";

const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <NavbarItem>
        <p>Hello, Ekamini</p>
        <p>{moment().format("ddd, DD MMMM YYYY")}</p>
      </NavbarItem>
      <NavbarItem>
        <NotiIcon>
          <BellLogo />
        </NotiIcon>
        <NotiIcon>
          <QuestionLogo />
        </NotiIcon>
        <div>
          <p>Ekemini Mark</p>
          <p>Heaps Normal</p>
        </div>
        <img src={ProfilePicture} alt="Profile" height={40} width={40} />
      </NavbarItem>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  background: #147d73;
  height: 84px;
  padding: 0 12px;
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 5fr);
  align-items: center;
  color: #ffffff;

  @media (max-width: 1024px) {
    grid-template-columns: auto auto auto;
  }
`;

const NavbarItem = styled.div`
  font-weight: 500;

  p {
    margin: 10px;
  }

  p:nth-child(2) {
    font-weight: 400;
    font-size: 12px;
  }

  &:nth-child(2) {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 10px;

    div:nth-child(3) {
      margin-left: 30px;
    }

    p {
      text-align: end;
    }
  }
`;

const NotiIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
