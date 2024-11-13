import styled from "styled-components";

export const Container = styled.div`
  animation: fadeIn 1s ease-out;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  min-height: 100vh;
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export const IconWrapper = styled.i`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.primary};
`;
