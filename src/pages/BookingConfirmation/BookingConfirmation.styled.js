import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 16px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export const SectionContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentContainer = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: start;
`;

export const VenueImage = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.effects.shadow};
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  text-align: left;
  h2 {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    margin: 8px 0;
    color: ${({ theme }) => theme.colors.text};
  }
  svg {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Label = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const PriceSection = styled.div`
  padding-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  border-top: 2px solid ${({ theme }) => theme.colors.background};
  margin-top: 20px;
  padding-top: 10px;
`;

export const AmenitiesContainer = styled.div`
  margin-top: 20px;
 
   span {
      margin-left:10px;
}
    svg:not(:root).svg-inline--fa,
    svg:not(:host).svg-inline--fa {
      color: ${({ theme }) => theme.colors.primary};
       margin: 0px 3px;
       font-size: 1.3rem;
    }
  }
`;

export const CustomerInfoContainer = styled.div`
  margin-top: 30px;
  text-align: left;
  h5 {
    font-size: 18px;
    margin-bottom: 10px;
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  p {
    font-size: 16px;
    margin: 5px 0;
    color: ${({ theme }) => theme.colors.text};
  }
  img {
    height: 100px;
    border-radius: 50%;
  }
`;
