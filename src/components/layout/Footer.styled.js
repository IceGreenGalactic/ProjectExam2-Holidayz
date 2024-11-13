import styled from "styled-components";
import { Link } from "react-router-dom";

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
