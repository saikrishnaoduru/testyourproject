import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import DropdownTrigger from './profile-dropdown'
  
const Nav = styled.div`
  background: #E8A4E8;
  height: 65px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavItem = styled.div`
  background: #E8A4E8;
  width:100vw;
  height: 65px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const UserIcon = styled.div`
font-size:18px;
width:200px;
background-color: #E8A4E8;
color: white;
`;

  
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavLogo = styled(Link)`
  font-weight:bold;
  margin-left: 2rem;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const SidebarNav = styled.nav`
  background: #E8A4E8;
  width: 260px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 50;
`;
  
const SidebarWrap = styled.div`
  width: 100%;
`;
  
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => setSidebar(!sidebar);
  
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <NavLogo to="/vcenter/slots-available">
            spotYourVaccine
          </NavLogo>
          <NavItem>
          <UserIcon>
          <DropdownTrigger />
          </UserIcon>

          </NavItem>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};
  
export default Sidebar;