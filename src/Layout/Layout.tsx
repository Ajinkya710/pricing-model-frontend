import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <LayoutSidebar>
        <Sidebar />
      </LayoutSidebar>
      <LayoutMain>
        <Navbar />
        <LayoutContent>{children}</LayoutContent>
      </LayoutMain>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LayoutSidebar = styled.div`
  width: 260px;
  background-color: #ffffff;
  color: #637381;
  flex-shrink: 0;
`;

const LayoutMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LayoutContent = styled.div`
  flex-grow: 1;
  padding: 26px;
  overflow-y: auto;
`;
