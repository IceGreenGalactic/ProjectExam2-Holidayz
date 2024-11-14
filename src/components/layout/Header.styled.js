import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
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

export const NavItem = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  &.active {
    font-weight: bold;
    border-bottom: 2px solid #ff846270;
    line-height: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;
