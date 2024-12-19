//Header

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;

  .logout-btn {
    background: ${({ theme }) => theme.colors.hover};
    padding: 5px 10px;
  }
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

export const NotActive = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

//footer

export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.gradient};
  padding: 40px 0px 10px 0px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const FooterLinks = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FooterLink = styled(Link)`
  font-size: 0.8rem;
  margin: 0 15px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 5px 0;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SocialIcons = styled.div`
  margin-bottom: 30px;
`;

export const SocialIcon = styled.a`
  font-size: 1.25rem;
  margin: 0px 10px;
  padding: 5px 10px;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Copyright = styled.div`
  font-size: 0.8rem;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

//BreadCrumbs
