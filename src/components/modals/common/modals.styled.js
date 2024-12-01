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
    padding-top: 1rem;
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
    margin-top: 1rem;
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

  .toggle-password {
    display: flex;
    color: #333;
    cursor: pointer;
    margin-left: 10px;
    gap: 5px;
    align-items: center;
    z-index: 1;
    i {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.8rem;
    }
  }

  .form-control {
    padding-right: 40px;
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

  .accordion-header {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.2);
    display: inline-block;
    margin-bottom: 8px;
    width: 100%;
    text-align: left;
  }

  .accordion-header:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .accordion-header .arrow-icon {
    transition: transform 0.2s ease;
  }
  .accordion-header[aria-expanded="true"] {
    background: rgba(255, 255, 255, 0.5);
  }

  .accordion-header[aria-expanded="true"] .arrow-icon {
    transform: rotate(180deg);
  }

  .delete-button {
    background-color: #e53e3e;
    color: white;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
    &:hover {
      background-color: #c53030;
    }
  }
`;
