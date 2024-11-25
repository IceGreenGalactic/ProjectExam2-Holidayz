import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 16px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export const SearchBookingContainer = styled.div``;

export const Input = styled.input`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.link};
  border-radius: 8px;
`;

export const Select = styled.select`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.link};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const SortSearchContainer = styled.div``;
