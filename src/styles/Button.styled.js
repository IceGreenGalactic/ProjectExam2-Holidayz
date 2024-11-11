import styled from "styled-components";

export const ButtonStyled = styled.button`
  background-color: ${({ theme }) =>
    theme.colors.gradient}; // Using theme values here
  color: ${({ theme }) => theme.colors.secondary};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;
