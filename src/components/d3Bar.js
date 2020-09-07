import { select, selectAll } from "d3-selection";
import { scaleLinear, scaleTime } from "d3-scale";
import { min, max, extent } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { line, curveMonotoneX } from "d3-shape";
import { timeFormat } from "d3-time-format";
import { ACTIVE_TABS } from "../constants/constants";
import { theme } from "../styles";
import { hex2rgba, formatNumber } from "../utils";
const { colors } = theme;

const MARGIN = { TOP: 20, BOTTOM: 60, LEFT: 60, RIGHT: 20 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

export default class BarChart {
  constructor(element, data, type) {
    this.element = element;
    this.data = data;
    this.type = type;
    this.strokeColor = this.getStrokeColor();
    this.dates = Object.keys(this.data);
    this.modifiedData = [];
    for (let date of this.dates) {
      this.modifiedData.push({ date, val: this.data[date].total[this.type] || 0 });
    }

    this.svg = select(this.element)
      .attr("class", "bar-svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style("background", this.getBgColor());

    this.barGroup = this.svg.append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.yScale = scaleLinear()
      .domain(extent(this.modifiedData, d => d.val))
      .range([HEIGHT, 0]);

    this.xScale = scaleTime().domain(extent(this.dates, d => new Date(d))).range([0, WIDTH]);

    this.xAxisGroup = this.barGroup.append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    this.yAxisGroup = this.barGroup.append("g");

    const timeFormatter = timeFormat("%B")

    this.xAxisCall = axisBottom(this.xScale)
      .tickFormat(d => timeFormatter(d).substr(0, 3));
    this.xAxisGroup.call(this.xAxisCall);

    this.yAxisCall = axisLeft(this.yScale)
      .tickFormat(d => formatNumber(d, 'short'));
    this.yAxisGroup.call(this.yAxisCall);

    this.lineGenerator = line()
      .x(d => this.xScale(new Date(d.date)))
      .y(d => this.yScale(d.val))
      .curve(curveMonotoneX);

    this.barGroup
      .append("path")
      .datum(this.modifiedData)
      .attr("fill", "none")
      .attr("stroke", this.strokeColor)
      .attr("stroke-width", "2px")
      .attr("d", this.lineGenerator);

    this.barGroup
      .append("text")
      .attr("transform", `translate(${WIDTH/2}, ${10})`)
      .attr("text-anchor", "middle")
      .attr("class", "bar-label")
      .style("color", this.strokeColor)
      .text(this.type.toUpperCase());
  }

  getBgColor() {
    switch (this.type) {
      case ACTIVE_TABS.CONFIRMED:
        return hex2rgba(colors.red, 0.1);
      case ACTIVE_TABS.ACTIVE:
        return hex2rgba(colors.blue, 0.1);
      case ACTIVE_TABS.RECOVERED:
        return hex2rgba(colors.green, 0.1);
      case ACTIVE_TABS.DECEASED:
        return hex2rgba(colors.darkGray, 0.1);
      default:
        return hex2rgba(colors.blue, 0.1);
    }
  }

  getStrokeColor() {
    switch (this.type) {
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

}