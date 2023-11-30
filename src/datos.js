import * as d3 from 'd3';

export const datos = {
  url: 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
  w: 960,
  h: 500,
  p_l: 80,
  p_t: 10,
  p_r: 20,
  p_b: 35,
};

export const roundedSec = (data, key) => {

 if ( data.length === 0 ) return [0, 0];
    
    // Parsea las fechas y obtén el mínimo y el máximo
  const parseTime = d3.timeParse('%M:%S');
  const min = d3.min(data, (d) => parseTime(d[key]));
  const max = d3.max(data, (d) => parseTime(d[key]));
  
  console.log(max)

  // Redondea al múltiplo más cercano de 15 segundos
  const secminRounded = min.getSeconds() - (min.getSeconds() % 15);
  const secMaxRounded = max.getSeconds() + (15 - (max.getSeconds() % 15));

  console.log(secminRounded);
  console.log(max.getSeconds() % 15);
  console.log(secMaxRounded);

  // Crea un nuevo objeto Date para el mínimo redondeado
  const minRounded = new Date(min);
  minRounded.setSeconds(secminRounded);

  const maxRounded = new Date(max);
  maxRounded.setSeconds(secMaxRounded);

  return [minRounded, maxRounded];
};

/* console.log(
  roundedSec([{ time: '36:55' }, { time: '37:25' }, { time: '37:50' }, { time: '39:23' }], 'time')
);
 */

