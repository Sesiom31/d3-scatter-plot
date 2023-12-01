import PropTypes from 'prop-types';

function Tooltip({ dataTooltip: { name, nation, year, time, doping, x, y } }) {
  return (
    <div id='tooltip' className="tooltip" style={{ transform: `translate(${x}px, ${y}px)` }}
     data-year={year} 
    >
      <p>
        {name} - {nation}{' '}
      </p>

      <p>
        Año: {year} -- Tiempo: {time}
      </p>
      {doping !== '' && <p>{doping}</p>}
      
    </div>
  );
}

Tooltip.propTypes = {
  dataTooltip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    doping: PropTypes.string.isRequired,
  }).isRequired,
};

export default Tooltip;


