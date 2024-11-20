import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 16px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 8px;
`;

export const Select = styled.select`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const VenuesContainer = styled.div``;
