import styled from "styled-components";

export const ModalContainer = styled.div`
  .modal {
    backdrop-filter: blur(5px);
    align-content: center;
  }

  .modal-content {
    background: ${({ theme }) => theme.colors.gradient};
    max-width: 90%;
    margin: auto;
    border: 2px solid ${({ theme }) => theme.colors.gradient};
  }

  .modal-header {
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 1px 1px 1px black;
    position: relative;
    padding-top: 2rem;
    text-align: center;

    h1 {
      font-size: 1.8rem;
    }
  }

  button {
    text-shadow: 1px 1px 1px black;
  }

  .btn-close {
    position: absolute;
    top: 1%;
    right: 10%;
    border: none;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
    cursor: pointer;
  }
  .form-control {
    font-size: 0.8rem;
    padding: 12px 10px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.link};
    transition: border-color 0.3s ease;
  }

  .modal-body {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 2rem;
  }

  .register {
    color: ${({ theme }) => theme.colors.text};

    a {
      color: ${({ theme }) => theme.colors.hover};
      text-decoration: none;
      font-weight: 800;
    }

    a:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: 320px) {
    .modal-header h1 {
      font-size: 1.4rem;
    }
  }

  .form-control:focus {
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.secondary};
  }
`;
