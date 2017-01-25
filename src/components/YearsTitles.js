import React, { PropTypes } from 'react'

export default function YearsTitles({ yearCenters }) {
  return (
    <g className="yearsTitles">
      {
        Object.keys(yearCenters).map(year =>
          <text
            key={year}
            x={yearCenters[year].x}
            y={50}
            fontSize="35"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {
              year
            }
          </text>)
      }
    </g>
  )
}

YearsTitles.propTypes = {
  yearCenters: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
