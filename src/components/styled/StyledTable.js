import styled from "styled-components";
import { media, theme } from "../../styles";
import { hex2rgba } from '../../utils';
const { colors, fonts } = theme;

export default styled.div `
  border-radius: 3px;
  display: inline-grid;
  font-size: 12px;
  min-width: 100%;
  grid-template-rows: auto;
  grid-template-columns: repeat(5, 1fr);
  max-height: 60rem;
  overflow: auto;
  grid-gap: .4rem;
  ${media.desktop`
    max-height: inherit;
  `}

  .row {
    display: contents;
    &:not(:last-child) {
      margin-bottom: .4rem;
    }
    &:nth-child(2n) {
      .cell {
        background: ${hex2rgba(colors.darkGray, 0.2)};
      }
    }
    &:nth-child(2n+1) {
      .cell {
        background: ${hex2rgba(colors.gray, 0.4)};
      }
    }
    &.heading {
      font-weight: 600;
      font-size: 1.3rem;
    }
  }

  .cell {
    padding: 1rem .8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: .3rem;
  }
`;