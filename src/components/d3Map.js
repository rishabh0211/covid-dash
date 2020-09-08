import { select, selectAll } from "d3-selection";
import { min, max, extent } from "d3-array";
import { scaleBand, scaleLinear, scaleOrdinal, scaleLog } from "d3-scale";
import { interpolateBlues, interpolateReds, interpolateGreens, interpolatePurples, interpolateGreys, interpolateOranges } from "d3-scale-chromatic";
import { transition } from "d3-transition";
import { json } from "d3-fetch";
import * as topojson from "topojson";
import { geoIdentity, geoPath } from 'd3-geo';
import { scaleSequential } from "d3-scale";
import { STATE_CODES, ACTIVE_TABS, STATE_NAMES } from "../constants/constants";

import { theme } from "../styles";
import { hex2rgba } from "../utils";
const { colors } = theme;

const MARGIN = { TOP: 100, BOTTOM: 50, LEFT: 20, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 600 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Map {
  constructor(element, data) {
    const vis = this;
    vis.data = data;

    vis.svg = select(element)
      .append("svg")
      .attr("class", "map-svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

    vis.mapGroup = vis.svg
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.stateBordersGroup = vis.svg
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.path = geoPath(geoIdentity());
    vis.activeTab = ACTIVE_TABS.CONFIRMED;

    vis.colorScale = vis.getMapScale();
    vis.transition = transition().duration(500);

    vis.infoGroup = vis.svg
      .append();

    json('/projected_maps/india.json').then(geoData => {
      vis.mesh = topojson.mesh(geoData, geoData.objects.states);
      vis.features = vis.getFeatures(geoData);
      vis.paths = vis.mapGroup.selectAll("path")
        .data(vis.features);
      vis.paths.enter()
        .append("path")
        .attr("stroke", "#fff0")
        .attr("fill", d => vis.getFillColor(d))
        .attr("d", vis.path)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0)
        .attr('pointer-events', 'all')
        .on("mouseenter", (e, d) => {
          vis.setHighlightedRegion(d.properties.st_nm);
        })
        .append("title")
        .text(d => d.properties.st_nm);

      vis.stateBorders = vis.stateBordersGroup.selectAll('path')
        .data([vis.mesh])
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        .attr('d', vis.path)
        .attr('stroke', vis.getStrokeColor());
    });

    vis.label = vis.mapGroup
      .append("text")
      .attr("transform", `translate(${WIDTH - 50}, ${10})`)
      .attr("text-anchor", "end")
      .attr("class", "bar-label")
      .style("color", this.getLabelColor())
      .text(this.activeTab.toUpperCase());
  }

  setHighlightedRegion(stateName) {
    const vis = this;
    vis.paths.enter()
      .append("path")
      .each(function (d) {
        const highlighted = stateName === d.properties.st_nm;
        select(this).attr('stroke-opacity', highlighted ? 1 : 0);
      });
  }

  getStrokeColor() {
    switch (this.activeTab) {
      case ACTIVE_TABS.CONFIRMED:
        return hex2rgba(colors.red, 0.2);
      case ACTIVE_TABS.ACTIVE:
        return hex2rgba(colors.blue, 0.2);
      case ACTIVE_TABS.RECOVERED:
        return hex2rgba(colors.green, 0.2);
      case ACTIVE_TABS.DECEASED:
        return hex2rgba(colors.darkGray, 0.4);
      default:
        return hex2rgba(colors.blue, 0.2);
    }
  }

  getLabelColor() {
    switch (this.activeTab) {
      case ACTIVE_TABS.CONFIRMED:
        return colors.red;
      case ACTIVE_TABS.ACTIVE:
        return colors.blue;
      case ACTIVE_TABS.RECOVERED:
        return colors.green;
      case ACTIVE_TABS.DECEASED:
        return colors.darkGray;
      default:
        return colors.blue;
    }
  }

  onActiveTabChange(activeTab) {
    const vis = this;
    vis.activeTab = ACTIVE_TABS[activeTab];
    vis.colorScale = vis.getMapScale();

    vis.paths.exit().transition(vis.transition).remove();
    vis.paths.enter()
      .append("path")
      .attr("stroke", "#fff")
      .attr("d", vis.path)
      .attr('stroke-width', 1.8)
      .attr('stroke-opacity', 0)
      .attr("fill", d => vis.getFillColor(d))
      .append("title")
      .text(d => d.properties.st_nm);

    vis.stateBorders
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-linejoin", "round")
      .attr("d", vis.path)
      .attr('stroke', vis.getStrokeColor());

    vis.label
      .style("color", this.getLabelColor())
      .text(this.activeTab.toUpperCase());

  }

  getFillColor(d) {
    const stateCode = STATE_CODES[d.properties.st_nm];
    if (stateCode === 'LD') return;
    const stateData = this.data[stateCode];
    return this.colorScale(stateData.total.confirmed);
  }

  getMapScale() {
    return scaleSequential(
      [0, Math.max(1, this.getDomainValue()[1])],
      this.colorInterpolator(this.activeTab)
    );
  }

  colorInterpolator(tab) {
    switch (tab) {
      case ACTIVE_TABS.CONFIRMED:
        return (t) => interpolateReds(t * 0.85);
      case ACTIVE_TABS.ACTIVE:
        return (t) => interpolateBlues(t * 0.85);
      case ACTIVE_TABS.RECOVERED:
        return (t) => interpolateGreens(t * 0.85);
      case ACTIVE_TABS.DECEASED:
        return (t) => interpolateGreys(t * 0.85);
      default:
        return (t) => interpolateOranges(t * 0.85);
    }
  };

  getFeatures(data) {
    const features = topojson.feature(data, data.objects.states).features;
    return features.map(feature => {
      const district = feature.properties.district;
      const state = feature.properties.st_nm;
      const obj = Object.assign({}, feature);
      obj.id = `TT-${state}${district ? '-' + district : ''}`;
      return obj;
    });
  }

  getDomainValue() {
    let min = Infinity, max = -Infinity;
    let countryData = this.data;
    let keys = Object.keys(countryData);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'TT') {
        continue;
      }
      let val;
      if (this.activeTab === ACTIVE_TABS.ACTIVE) {
        val = countryData[keys[i]].total[ACTIVE_TABS.CONFIRMED] - countryData[keys[i]].total[ACTIVE_TABS.RECOVERED] - countryData[keys[i]].total[ACTIVE_TABS.DECEASED];
      } else {
        val = countryData[keys[i]].total[this.activeTab];
      }
      if (val < min) {
        min = val;
      }
      if (val > max) {
        max = val;
      }
    }
    return [0, max];
  }


  update() {
    const vis = this;
  }
}