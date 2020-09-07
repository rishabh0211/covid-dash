import React, { useEffect, useRef, useState } from 'react';
import StyledBarchart from './styled/StyledBarchart';
import BarChart from './d3Bar';
import { ACTIVE_TABS } from '../constants/constants';

const Barcharts = ({ timeSeries }) => {
  const { dates } = timeSeries["TT"];

  const activeChartRef = useRef();
  const confirmedChartRef = useRef();
  const recoveredChartRef = useRef();
  const deceasedChartRef = useRef();

  const [activeChart, setActiveChart] = useState(null);
  const [confirmedChart, setConfirmedChart] = useState(null);
  const [recoveredChart, setRecoveredChart] = useState(null);
  const [deceasedChart, setDeceasedChart] = useState(null);

  useEffect(() => {
    if (!activeChart) {
      setActiveChart(new BarChart(activeChartRef.current, dates, ACTIVE_TABS.ACTIVE));
    }
    if (!confirmedChart) {
      setConfirmedChart(new BarChart(confirmedChartRef.current, dates, ACTIVE_TABS.CONFIRMED));
    }
    if (!recoveredChart) {
      setRecoveredChart(new BarChart(recoveredChartRef.current, dates, ACTIVE_TABS.RECOVERED));
    }
    if (!deceasedChart) {
      setDeceasedChart(new BarChart(deceasedChartRef.current, dates, ACTIVE_TABS.DECEASED));
    }
  }, []);

  return (
    <StyledBarchart>
      <svg className="bar-svg active-bar" ref={activeChartRef}></svg>
      <svg className="bar-svg confirmed-bar" ref={confirmedChartRef}></svg>
      <svg className="bar-svg recovered-bar" ref={recoveredChartRef}></svg>
      <svg className="bar-svg deceased-bar" ref={deceasedChartRef}></svg>
    </StyledBarchart>
  )
}

const isEqual = () => {
  return true;
}

export default React.memo(Barcharts, isEqual);