import React from 'react';
import styled from "styled-components";
import { hex2rgba } from "../utils";
import { theme } from "../styles";
const { colors } = theme;

const StyledNavbar = styled.nav`
  padding: 2.4rem;
  width: 100%;
  /* box-shadow: 0 1rem 1rem ${hex2rgba(colors.black, 0.1)}; */
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <h1>C19</h1>
    </StyledNavbar>
  )
}

export default Navbar;
