import styled from "styled-components";

export const HeroSection = styled.section`
  position: relative;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: 65% 40%;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 80px 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  z-index: 1;
`;

export const HeroContainer = styled.div`
  background-color: rgba(201, 201, 201, 0.593);
  display: flex;
  border-radius: 10px;
  padding: 20px;
`;

export const HeroText = styled.div`
  position: relative;
  display: inline-block;
  z-index: 2;
  color: ${({ theme }) => theme.colors.text};

  p {
    font-size: 0.9rem;
    z-index: 2;
    font-weight: 500;
  }
`;

export const HeroLink = styled.a`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding: 20px 0;

  &:hover {
    text-decoration: underline;
  }
`;
