import React from 'react';
import {Metrics} from './metrics';

function C1() {
  const refreshInterval_Secs = 600;
  const timeRange = 10;
  const seed = Math.random();
  const component = "c1";

  return (
    <div className="App">
        <Metrics refreshInterval_Secs={refreshInterval_Secs} timeRange={timeRange} componentName={component} seed={seed}/>
    </div>
  );
}

export default C1;
