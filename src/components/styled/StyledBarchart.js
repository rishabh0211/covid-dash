import styled from "styled-components";
import { media, theme } from "../../styles";
import { hex2rgba } from "../../utils";

const { fontSizes, colors } = theme;

export default styled.div`
  text-align: center;
  .bar-svg {
    border-radius: 1rem;
    box-shadow: inset 0 .1rem 1rem ${hex2rgba(colors.black, 0.4)};
    margin: 2rem 2rem 0 0;
  }
  .bar-label {
    font-weight: 700;
    font-size: 1.4rem;
  }
`;