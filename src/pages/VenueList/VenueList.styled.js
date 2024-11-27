import styled from "styled-components";
import { Pagination } from "react-bootstrap";

export const PageContainer = styled.div`
  box-shadow: ${({ theme }) => theme.effects.shadow};
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export const ContentContainer = styled.div`
  padding: 16px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
`;

//For BookingSearch
export const StyledInput = styled.input`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.link};
  border-radius: 8px;
`;

export const BookingContainerSearch = styled.div`
  background: linear-gradient(135deg, #f8b7a6 10%, #bfeae2 100%);
`;

export const SearchBookingContainer = styled.div``;

//For sortSelector
export const Select = styled.select`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.link};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const SortSearchContainer = styled.div``;

export const StyledPagination = styled(Pagination)`
  justify-content: center;
  margin-top: 20px;

  .page-item {
    .page-link {
      color: ${({ theme }) => theme.colors.primary};
      background-color: transparent;
      border: none;
      font-family: ${({ theme }) => theme.fonts.heading};
      transition: color 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.hover};
        cursor: pointer;
      }
    }

    &.active .page-link {
      color: ${({ theme }) => theme.colors.hover};
      font-weight: bold;
      text-decoration: underline;
    }

    &.disabled .page-link {
      color: ${({ theme }) => theme.colors.text};
      cursor: not-allowed;
    }
  }
`;
