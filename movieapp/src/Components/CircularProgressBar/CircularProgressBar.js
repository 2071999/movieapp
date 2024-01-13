import React from 'react'
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from './AnimatedProgressProvider';
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
const CircularProgressBar = (props) => {
    const { value } = props;
    return (
        <div>
            <AnimatedProgressProvider
        valueStart={0}
        valueEnd={value}
        duration={3}
        easingFunction={easeQuadInOut}
      >
        {value => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
              styles={buildStyles({ pathTransition: "none" })}
            />
          );
        }}
      </AnimatedProgressProvider>
        </div>
    )
}

export default CircularProgressBar
