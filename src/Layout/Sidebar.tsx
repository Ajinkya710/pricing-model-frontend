import React from "react";
import styled from "styled-components";
import { ReactComponent as DashboardLogo } from "../Assets/svg/Dashboard/Dashboard.svg";
import { ReactComponent as OrdersLogo } from "../Assets/svg/Dashboard/Orders.svg";
import { ReactComponent as CustomersLogo } from "../Assets/svg/Dashboard/Customers.svg";
import { ReactComponent as ProductsLogo } from "../Assets/svg/Dashboard/Products.svg";
import { ReactComponent as PricingLogo } from "../Assets/svg/Dashboard/Pricing.svg";
import { ReactComponent as FreightLogo } from "../Assets/svg/Dashboard/Freight.svg";
import { ReactComponent as IntegrationsLogo } from "../Assets/svg/Dashboard/Integrations.svg";
import { ReactComponent as SettingsLogo } from "../Assets/svg/Dashboard/Settings.svg";
import { Link, useLocation } from "react-router-dom";
import SidebarHeaderLogo from "../Assets/images/SidebarHeaderLogo.png";
import SidebarFooterLogo from "../Assets/images/SidebarFooterLogo.png";

const menu = [
  {
    name: "Dashboard",
    url: "/dashboard",
    logo: <DashboardLogo />,
    isNew: false,
  },
  {
    name: "Orders",
    url: "/orders",
    logo: <OrdersLogo />,
    isNew: false,
  },
  {
    name: "Customers",
    url: "/customers",
    logo: <CustomersLogo />,
    isNew: false,
  },
  {
    name: "Products",
    url: "/products",
    logo: <ProductsLogo />,
    isNew: false,
  },
  {
    name: "Pricing",
    url: "/pricing",
    logo: <PricingLogo />,
    isNew: false,
  },
  {
    name: "Freight",
    url: "/freight",
    logo: <FreightLogo />,
    isNew: true,
  },
  {
    name: "Integrations",
    url: "/integrations",
    logo: <IntegrationsLogo />,
    isNew: false,
  },
  {
    name: "Settings",
    url: "/settings",
    logo: <SettingsLogo />,
    isNew: false,
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarWrapper>
      <Logo>
        <img src={SidebarHeaderLogo} alt="Heaps Normal Logo" />
      </Logo>
      <Menu>
        {menu.map((item, index) => {
          const isActive = location.pathname === item.url;
          return (
            <React.Fragment>
              <MenuItem key={index} to={item.url} isActive={isActive}>
                <StyledLogo isActive={isActive}>{item.logo}</StyledLogo>
                <span>{item.name}</span>
                {item.isNew && <span>NEW</span>}
              </MenuItem>
              {index === menu.length - 2 && <Divider />}
            </React.Fragment>
          );
        })}
      </Menu>
      <Logo>
        <img src={SidebarFooterLogo} alt="FOBOH logo" />
      </Logo>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  background: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  height: 84px;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const Menu = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  padding-left: 32px;
  padding-top: 26px;
`;

const MenuItem = styled(Link)<{ isActive: boolean }>`
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: #637381;
  padding: 10px 0;

  ${({ isActive }) =>
    isActive &&
    `
      border-right: 1.5px solid #147D73;
      color: #212b36 !important;
  `}

  span:nth-of-type(2) {
    color: #dc3545;
    margin-left: auto;
    padding: 0 10px;
  }
`;

const StyledLogo = styled.div<{ isActive: boolean }>`
  svg {
    color: ${({ isActive }) => (isActive ? "#147D73" : "inherit")};
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0
`;
