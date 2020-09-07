import React, { useState, useEffect } from 'react';
import StyledTable from './styled/StyledTable';
import { STATE_NAMES } from '../constants/constants';
import { formatNumber } from '../utils';

const Table = ({ countryData }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    setStates(Object.keys(countryData));
  }, [countryData]);

  return (
    <StyledTable>
      <div className="row heading">
        <div className="cell">State/UT</div>
        <div className="cell">Confirmed</div>
        <div className="cell">Active</div>
        <div className="cell">Recovered</div>
        <div className="cell">Deceased</div>
      </div>
      {!!states.length && states.map((state, idx) => {
        if (state !== 'TT') {
          return (
            <div className="row" key={state}>
              <div className="cell">{STATE_NAMES[state].substr(0,19)}</div>
              <div className="cell">{formatNumber(countryData[state].total.confirmed, 'int') || 0}</div>
              <div className="cell">{formatNumber(countryData[state].total.confirmed - (countryData[state].total.deceased || 0) - (countryData[state].total.recovered || 0), 'int')}</div>
              <div className="cell">{formatNumber(countryData[state].total.recovered, 'int') || 0}</div>
              <div className="cell">{formatNumber(countryData[state].total.deceased, 'int') || 0}</div>
            </div>
          )
        }
      })}
      {!!states.length && 
        <div className="row heading">
          <div className="cell">India</div>
          <div className="cell">{formatNumber(countryData['TT'].total.confirmed, 'int')}</div>
          <div className="cell">{formatNumber(countryData['TT'].total.confirmed - countryData['TT'].total.deceased - countryData['TT'].total.recovered, 'int')}</div>
          <div className="cell">{formatNumber(countryData['TT'].total.recovered, 'int')}</div>
          <div className="cell">{formatNumber(countryData['TT'].total.deceased, 'int')}</div>
        </div>
      }
    </StyledTable>
  )
}

export default Table;