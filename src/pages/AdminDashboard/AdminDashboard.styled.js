import styled from "styled-components";

export const AdminDashboardContainer = styled.div`
  padding: 2rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
  }
`;

export const CreateVenueButton = styled.div`
  a {
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  }
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const NoDataMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Pagination = styled.div`
  text-align: center;
  margin-top: 20px;

  button {
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    cursor: pointer;

    &:disabled {
      background-color: #ddd;
    }

    &:not(:disabled):hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  }

  span {
    margin: 0 15px;
  }
`;

export const Actions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;

  button {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;
