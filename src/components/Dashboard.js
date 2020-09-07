import React, { useEffect, useState, useMemo } from 'react';
import StyledDashboard from './styled/StyledDashboard';
import { API_ROOT_URL_COVID19INDIA, ACTIVE_TABS } from '../constants/constants';
import MapContainer from './MapContainer';
import { json } from "d3-fetch";
import Table from './Table';
import { formatNumber } from '../utils';
import Barcharts from './Barcharts';

const Dashboard = () => {
  const [countryData, setCountryData] = useState({});
  const [activeTab, setActiveTab] = useState('active');
  const [timeSeries, setTimeSeries] = useState(null);

  useEffect(() => {
    json(`${API_ROOT_URL_COVID19INDIA}/data.min.json`)
      .then(res => {
        // Object.values(res).forEach(obj => {
        // });
        setCountryData(res);
        setActiveTab(ACTIVE_TABS.CONFIRMED);
      }).catch(err => {
        console.log(err);
      });
    json(`${API_ROOT_URL_COVID19INDIA}/timeseries.min.json`)
      .then(res => {
        Object.values(res.TT.dates).forEach(d => {
          d.total.active = (d.total.confirmed || 0) - (d.total.recovered || 0) - (d.total.deceased || 0)
        });
        setTimeSeries(res);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  const cardsArray = useMemo(() => {
    if (!countryData || !Object.keys(countryData).length) return;
    let arr = [];
    let data = countryData["TT"].total;
    let keys = Object.keys(ACTIVE_TABS);
    for (let key of keys) {
      let cKey = key;
      key = key.toLowerCase();
      if (data[key]) {
        arr.push({ cKey, key, val: formatNumber(data[key], 'int') });
      } else {
        arr.push({ cKey, key, val: formatNumber(data.confirmed - (data.recovered || 0) - (data.deceased || 0), 'int') });
      }
    }
    return arr;
  }, [countryData]);


  return (
    <>
      {countryData && !!Object.keys(countryData).length ? (
        <StyledDashboard>
          <h1>
            Dashboard
        </h1>
          <section className="cards-container">
            {
              cardsArray && !!cardsArray.length && cardsArray.map(card => (
                <div className={`card ${card.key}`} key={card.key} onClick={() => setActiveTab(card.cKey)}>
                  <h3 className="card-title">{card.key}</h3>
                  <p className="card-number">{card.val}</p>
                </div>
              ))}
          </section>
          <div className="map-table-container">
            <div className="map-container">
              <MapContainer countryData={countryData} activeTab={activeTab} />
            </div>
            <div className="table-container">
              <Table countryData={countryData} />
            </div>
          </div>
          {timeSeries &&
            <section className="middle-section">
              <Barcharts timeSeries={timeSeries} />
            </section>
          }
        </StyledDashboard>
      ) : (
          <div>Loading...</div>
        )
      }
    </>
  )
}

export default Dashboard;