import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 16px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
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
  }
`;

export const InfoContainer = styled.div`
  .d-flex {
    flex-direction: column;
    align-items: flex-start;
  }
  .svg-inline--fa {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 10px;
  }
`;

export const BookingSummary = styled.div`
  position: relative;
  padding-bottom: 20px;
  .edit-button {
    padding: 0px;
    background: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PriceSection = styled.div`
  display: block;
  div {
    margin: 10px 0px;
    font-weight: bold;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;

export const GuestPicker = styled.div`
  top: 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  padding: 10px;

  button {
    padding: 0px;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.primary};
    margin: auto;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.colors.hover};
    }
  }

  span {
    margin: 0 10px;
    color: ${(props) => props.theme.colors.text};
  }
`;

export const CancellationPolicySection = styled.section`
  h5 {
    margin-bottom: 10px;
    font-family: ${({ theme }) => theme.fonts.heading};

    color: ${(props) => props.theme.colors.text};
  }

  p {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const SectionContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  padding: 10px;
`;
