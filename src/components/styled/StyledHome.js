import styled from "styled-components";
import { theme, media } from "../../styles";
import { hex2rgba } from "../../utils";
const { colors, fontSizes } = theme;

export default styled.main`
  .login-section {
    max-width: 60rem;
    margin: 10rem auto 0;
    padding: 5rem;

    .modal {
      width: 100%;
      padding: 4rem;
      box-shadow: 0rem .3rem 1rem ${hex2rgba(colors.black, 0.4)};
      border-radius: 1rem;
      background: #edf6f9;
      box-shadow:  3rem 3rem 6rem ${colors.darkGray}, 
                  -3rem -3rem 6rem ${colors.white};
    }

    .switch-container {
      display: inline-flex;
      float: right;
      .switch-btn {
        border: solid .1rem ${colors.darkBlue};
        border-radius: .3rem;
        padding: 1rem 2rem;
        text-transform: uppercase;
        background: ${colors.lightGray};
        font-weight: 700;
        color: ${colors.darkBlue};
        &.active {
          background: ${colors.darkBlue};
          color: ${colors.lightGray};
        }
      }
      .first {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .second {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
      }
    }

    .header {
      font-size: ${fontSizes["3xl"]};
    }
    
    .form {
      margin-top: 8rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;

      &:not(:first-child) {
        margin-top: 1.6rem;
      }

      .form-label {
        margin-top: .4rem;
        font-weight: 500;
        transition: ${theme.transition};
        margin-left: .8rem;
        display: flex;
      }
    }

    .form-control {
      border: none;
      background: #edf6f9;
      border-bottom: solid 1px;
      padding: 1rem .8rem;
      font-size: 1.4rem;

      &:placeholder-shown + .form-label {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-3rem);
      }
    }

    .error-msg {
      margin: 1rem 0 0 .8rem;
      color: ${colors.red};
      font-weight: 500;
    }

    .submit-btn {
      margin-top: 3.2rem;
      width: 100%;
      padding: 1.4rem 2rem;
      background: ${colors.darkBlue};
      color: ${colors.lightGray};
      border-radius: .3rem;
      text-transform: uppercase;
      letter-spacing: .2rem;
      font-size: ${fontSizes.md};
      font-weight: 500;

      &:disabled {
        background: ${hex2rgba(colors.darkBlue, 0.4)};
        pointer-events: none;
      }
    }

  }
`;