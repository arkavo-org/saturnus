import React from "react";
import { Link } from "react-router-dom";

import LoggedInUserMenu from "../../containers/LoggedInUserMenu";
import SidebarToggler from "../../containers/SidebarToggler";
import ContentBox from "../ContentBox";
import Icon from "../Icon";
import SaturnusLogo from "../SaturnusLogo";
import { LogoWrapper } from "./styles";
import "./Header.scss";

function Header() {
  return (
    <ContentBox className="header-component">
      <SidebarToggler>
        <Icon icon="bars" />
      </SidebarToggler>
      <Link to="/">
        <LogoWrapper>
          <SaturnusLogo />
        </LogoWrapper>
      </Link>
      <div>
        <Link to="/">Saturnus</Link>
      </div>
      <LoggedInUserMenu />
    </ContentBox>
  );
}

export default Header;
