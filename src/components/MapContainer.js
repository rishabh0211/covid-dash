import React, { useRef, useEffect, useState } from 'react';
import styled from "styled-components";
import D3Map from './d3Map';
import { media, theme } from "../styles";
import { hex2rgba } from '../utils';
const { colors, fonts } = theme;

const StyledMapContainer = styled.div`
  .map-svg {
    border-radius: 1rem;
    box-shadow: inset 0 .1rem 1rem ${hex2rgba(colors.black, 0.4)};
  }
`;

const MapContainer = ({ countryData, activeTab }) => {
  const chartArea = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Map(chartArea.current, countryData));
    } else {
      chart.update(countryData);
    }
  }, [chart]);

  useEffect(() => {
    chart && chart.paths && chart.onActiveTabChange(activeTab);
  }, [activeTab]);

  return (
    <StyledMapContainer className="map-area" ref={chartArea}></StyledMapContainer>
  )
};

const isEqual = (prevProps, currProps) => {
  if (prevProps.activeTab !== currProps.activeTabs) {
    return false;
  }
  return true;
}

export default React.memo(MapContainer, isEqual);