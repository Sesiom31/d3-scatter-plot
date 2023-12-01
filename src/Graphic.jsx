import * as d3 from 'd3';
import { datos, roundedSec } from './datos';
import { useEffect, useState, useRef } from 'react';
import Tooltip from './Tooltip';

const { url, w, h, p_t, p_r, p_b, p_l } = datos;

function Graphic() {
  const [data, setData] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dataTooltip, setDataTooltip] = useState({
    name: '',
    nation: '',
    year: 1900,
    time: '',
    doping:'',
    x: 0,
    y: 0,
  });

  const gxRef = useRef();
  const gyRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    const fetchDatos = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };

    fetchDatos(url);
  }, []);

  console.log(data);

  const dateFormatX = d3.timeParse('%Y');
  const domain = roundedSec(data, 'Time');

  const scaleX = d3
    .scaleTime()
    .domain([
      d3.min(data, (d) => dateFormatX(d.Year - 1)),
      d3.max(data, (d) => dateFormatX(d.Year + 1)),
    ])
    .range([p_l, w - p_r]);

  const scaleY = d3
    .scaleTime()
    .domain(domain)
    .range([h - p_b, p_t]);

  console.log(scaleY.domain());

  useEffect(() => {
    d3.select(gxRef.current).call(d3.axisBottom(scaleX));
  }, [scaleX]);

  useEffect(() => {
    const numTicks = Math.ceil((domain[1] - domain[0]) / 1000 / 15);
    const tickValues = Array.from(
      { length: numTicks },
      (_, i) => new Date(+domain[0] + i * 15 * 1000)
    );
    d3.select(gyRef.current).call(
      d3.axisLeft(scaleY).tickValues(tickValues).tickFormat(d3.timeFormat('%M:%S'))
    );
  }, [scaleY, domain]);

  useEffect(() => {
    d3.select(svgRef.current)
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .style('cursor', 'pointer')
      .attr('class', 'dot')
      .attr('data-xvalue', (d) => d.Year)
      .attr('data-yvalue', (d) => d3.timeParse('%M:%S')(d.Time).toISOString())
      .attr('cx', (d) => scaleX(dateFormatX(d.Year)))
      .attr('cy', (d) => scaleY(d3.timeParse('%M:%S')(d.Time)))
      .attr('r', 5)
      .attr('fill', (d) => (d.Doping ? 'rgb(150, 168, 150)' : 'rgb(29, 57, 76)'))
      .on('mouseover', (e, d) => {
        console.log('hola');
        console.log(d.Name, d.Nationality, d.Year, d.Time);
        setShowTooltip(true);
        setDataTooltip({
          name: d.Name,
          nation: d.Nationality,
          year: d.Year,
          time: d.Time,
          doping: d.Doping,
          x: e.pageX - w + 295,
          y: e.pageY - h + 115,
        });
      })
      .on('mouseout', () => {
        setShowTooltip(false);
      });
  }, [data, scaleX, scaleY, dateFormatX]);

  return (
    <div className="container-svg">
      <svg width={w} height={h} ref={svgRef}>
        <g
          id="x-axis"
          ref={gxRef}
          transform={`translate(0, ${h - p_b})`}
          style={{ fontSize: '0.75rem', color: '#fff' }}
        ></g>
        <g
          id="y-axis"
          ref={gyRef}
          transform={`translate(${p_l},0)`}
          style={{ color: '#fff', fontSize: '0.65rem' }}
        ></g>

        <g id="legend">
          <rect width={20} height={20} x={w - p_r} y={h / 2} fill="rgb(29, 57, 76)"></rect>
          <rect width={20} height={20} x={w - p_r} y={h / 2 - 30} fill="rgb(150, 168, 150)"></rect>
          <text x={w - p_r - 160} y={h / 2 + 15} fill="#fff" style={{ fontSize: '0.9rem' }}>
            Sin acusaciones de dopaje
          </text>
          <text x={w - p_r - 160} y={h / 2 - 15} fill="#fff" style={{ fontSize: '0.9rem' }}>
            Con acusaciones de dopaje
          </text>
        </g>
      </svg>
      {showTooltip && <Tooltip dataTooltip={dataTooltip} />}
    </div>
  );
}

export default Graphic;
