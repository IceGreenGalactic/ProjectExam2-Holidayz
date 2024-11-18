import styled from "styled-components";

export const ProfileContainer = styled.div`
  box-shadow: ${({ theme }) => theme.effects.shadow};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  max-width: 1200px;
`;

export const ProfileSection = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const HeroBanner = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 300px;
  position: relative;
  border-radius: 10px 10px 0px 0px;
`;

export const ProfileImageContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 5px solid white;
`;

export const ProfileInfo = styled.div`
  color: ${({ theme }) => theme.colors.text};
  h2 {
    font-size: 2.3rem;
    font-weight: bold;
  }
`;

export const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const SectionContainer = styled.div`
  margin: 40px 0px;
  box-shadow: ${({ theme }) => theme.effects.shaddow};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SectionHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-top: 20px;
`;

export const NoDataMessage = styled.p`
  font-size: 1rem;
  margin: 3rem 0rem;
  color: ${({ theme }) => theme.colors.textLight};
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;
