import React from 'react';
import {Metrics} from './metrics';

function C4() {
  const refreshInterval_Secs = 42;
  const timeRange = 10;
  const seed = Math.random();
  const component = "c4";

  return (
    <div className="App">
        <Metrics refreshInterval_Secs={refreshInterval_Secs} timeRange={timeRange} componentName={component} seed={seed}/>
    </div>
  );
}

export default C4;
