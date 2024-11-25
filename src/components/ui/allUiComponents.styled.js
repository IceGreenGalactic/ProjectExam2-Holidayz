import styled from "styled-components";

export const StyledSearchbar = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.link};
  border-radius: 8px;
  padding: 0px 5px;
  color: ${({ theme }) => theme.colors.link};
`;

export const SearchBarButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.link};
`;
