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

export const Label = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
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
    }
  }
`;

export const CustomerInfoContainer = styled.div`
  margin-top: 30px;
  text-align: left;
  h5 {
    margin-bottom: 10px;
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  p {
    margin: 5px 0;
    color: ${({ theme }) => theme.colors.text};
  }
  img {
    height: 100px;
    border-radius: 50%;
  }
`;
