import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.gradient};
  padding: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const FooterLinks = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FooterLink = styled(Link)`
  margin: 0 15px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SocialIcons = styled.div`
  margin-bottom: 15px;
`;

export const SocialIcon = styled.a`
  font-size: 1.5rem;
  margin: 0 10px;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Copyright = styled.div`
  font-size: 0.9rem;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.text};
`;
