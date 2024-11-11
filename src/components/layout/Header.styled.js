import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.gradient};
  padding: 20px 0;
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  padding: 0 1.5rem;
`;

export const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const Logo = styled.img`
  max-width: 4rem;

  @media (min-width: 768px) {
    max-width: 5rem;
  }

  @media (min-width: 992px) {
    max-width: 6rem;
  }
`;

export const BrandName = styled.span`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-shadow: 2px 1px 1px white;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 992px) {
    font-size: 2.5rem;
  }
`;

export const NavItem = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 15px;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
