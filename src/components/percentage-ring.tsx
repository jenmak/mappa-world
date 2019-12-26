import React from 'react';
import { DIMENSIONS_MAP, DIMENSION_NAMES } from '../constants/dimensions';

class PercentageRing extends React.Component<
  { color: number, radius: number, stroke: number, progress: number, text: number},
  { normalizedRadius: number, circumference: number }> {
    constructor(props: any) {
      super(props);

      const { radius, stroke } = this.props;

      this.state = { 
        normalizedRadius: radius - stroke * 2,
        circumference: (radius - stroke * 2) * 2 * Math.PI
    }
  }

  render() {
    const { color, radius, stroke, progress, text } = this.props;
    const strokeDashoffset = this.state.circumference - progress / 100 * this.state.circumference;
    const redVal = 255 - ((color - DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MIN)/(DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MAX - DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MIN) * 255);
    return (
      <svg
        height={radius * 2}
        width={radius * 2}
        >
        <circle
          stroke={`rgb(${redVal}, 188, 255)`}
          fill="transparent"
          strokeWidth={ stroke }
          strokeDasharray={ this.state.circumference + ' ' + this.state.circumference }
          style={ { strokeDashoffset } }
          r={ this.state.normalizedRadius }
          cx={ radius }
          cy={ radius }
          />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fill="white"
          className='text-xs'>{text}</text>
      </svg>
    );
  }
}

export default PercentageRing;