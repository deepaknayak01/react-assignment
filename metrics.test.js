import React from 'react';
import ReactDOM from 'react-dom';
import Metrics from './../metrics';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Metrics></Metrics>, div);
    ReactDOM.unmountComponentAtNode(div);
});





