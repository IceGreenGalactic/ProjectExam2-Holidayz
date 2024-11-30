import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.effects.shadow};

  .edit-button {
    box-shadow: ${({ theme }) => theme.effects.shadow};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    padding: 3px 10px;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.hover};
      border: 2px solid ${({ theme }) => theme.colors.hover};
    }
  }
`;

export const Media = styled.div`
  position: relative;
  height: 250px;
  width: 100%;
  background: ${({ url }) => `url(${url}) no-repeat center center / cover`};
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  span {
    font-size: 0.8rem;
  }
`;

export const Amenities = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 5px;
  background: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
`;
