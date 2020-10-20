import React from 'react';
import {Metrics} from './metrics';

function C3() {
  const refreshInterval_Secs = 15;
  const timeRange = 10;
  const seed = Math.random();
  const component = "c3";

  return (
    <div className="App">
        <Metrics refreshInterval_Secs={refreshInterval_Secs} timeRange={timeRange} componentName={component} seed={seed}/>
    </div>
  );
}

export default C3;
