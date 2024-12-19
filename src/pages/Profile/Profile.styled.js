import styled from "styled-components";
import { Pagination } from "react-bootstrap";

// Profile Container
export const ProfileContainer = styled.div`
  box-shadow: ${({ theme }) => theme.effects.shadow};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  max-width: 1200px;
  padding: 2rem;
`;

export const ContentContainer = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: start;
`;

// Hero Banner
export const HeroBanner = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 300px;
  position: relative;
  border-radius: 10px 10px 0px 0px;
`;

// Profile Image Container
export const ProfileImageContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 767px) {
    top: 80%;
  }
`;

// Profile Image
export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 5px solid white;
`;

// Profile Info
export const ProfileInfo = styled.div`
  color: ${({ theme }) => theme.colors.text};
  h2 {
    font-weight: bold;
  }
`;

// Edit Button
export const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1px 2px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .mr-2 {
    margin-right: 8px;
  }
`;

// Section Container
export const SectionContainer = styled.div`
  margin: 40px 0px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
`;

// Section Header
export const SectionHeader = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-top: 20px;
`;

// No Data Message
export const NoDataMessage = styled.p`
  margin: 3rem 0rem;
  color: ${({ theme }) => theme.colors.textLight};
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
`;

// Styled Pagination
export const StyledPagination = styled(Pagination)`
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;

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

// Styled Pagination Item
export const StyledPaginationItem = styled(Pagination.Item)`
  margin: 0 5px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  border: none;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  text-decoration: ${({ active }) => (active ? "underline" : "none")};

  &:hover {
    color: ${({ theme }) => theme.colors.hover};
    background-color: transparent;
  }

  &.disabled {
    color: ${({ theme }) => theme.colors.text};
    cursor: not-allowed;
  }
`;

// Grid Layout for Venue Cards
export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
`;

// ManageVenuesCard
export const ManageVenuesCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  &:hover {
    box-shadow: ${({ theme }) => theme.effects.hoverShadow};
  }
`;

// IconContainer
export const IconContainer = styled.div`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

// Card Title
export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  margin-bottom: 10px;
`;

// Card Description
export const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 20px;
`;

// ActionButton
export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .mr-2 {
    margin-right: 8px;
  }
`;
