import styled from "styled-components";
import { media, theme } from "../../styles";
import { hex2rgba } from "../../utils";

const { fontSizes, colors } = theme;

export default styled.main`
  min-height: calc(100vh - 7.5rem);
  width: 100%;
  padding: 5rem 2rem;
  max-width: 130rem;
  margin: auto;

  .cards-container {
    display: flex;
    margin-top: 2rem;
    max-width: 100%;
    justify-content: space-between;
  }

  .card {
    width: 22%;
    box-shadow: 0 0.4rem 1rem rgba(0,0,0,.2);
    padding: 3rem 1.2rem;
    border-radius: .4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &.active {
      color: ${colors.blue};
      background: ${hex2rgba(colors.blue, 0.2)};
    }
    &.confirmed {
      color: ${colors.red};
      background: ${hex2rgba(colors.red, 0.2)};
    }
    &.recovered {
      color: ${colors.green};
      background: ${hex2rgba(colors.green, 0.2)};
    }
    &.deceased {
      color: ${colors.darkGray};
      background: ${hex2rgba(colors.darkGray, 0.2)};
    }

    .card-title {
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .card-number {
      margin-top: 1rem;
      font-size: 1.6rem;
      font-weight: 700;
    }
  }

  .map-table-container {
    display: flex;
    margin-top: 5rem;
    ${media.desktop`
      flex-direction: column;
      align-items: center;
    `}
  }

  .map-container {
    margin-right: 1rem;
    flex-shrink: 0;
    ${media.desktop`
      margin-right: 0;
    `}
  }

  .table-container {
    margin-left: 2rem;
    ${media.desktop`
      margin-top: 2rem;
      margin-left: 0;
    `}
  }

  .middle-section {
    margin-top: 6rem;
  }
`;