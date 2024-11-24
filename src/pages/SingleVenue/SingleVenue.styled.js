import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 16px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export const ImageContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const InfoContainer = styled.div`
  .svg-inline--fa {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 10px;
  }
`;

export const Stars = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.2rem 0.5rem;
  border-radius: 10%;
`;
export const ContentContainer = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: start;
`;

export const BookingCardContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const BookingCard = styled.div`
  border-radius: 8px;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  background-color: ${({ theme }) => theme.colors.white};
  h3 {
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    width: 100%;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const LocationContainer = styled.div`
  p {
    display: flex;
    align-items: center;
    gap: 10px;
    svg:not(:root).svg-inline--fa,
    svg:not(:host).svg-inline--fa {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const MapContainer = styled.div`
  height: 300px;
  position: relative;
`;
