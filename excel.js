import React, {useState, useEffect} from 'react';
import './../../styles/excel.css';

function Excel() {
    const [grid, setGrid] = useState(Array(100).fill(null));
    const tableWidth = Math.sqrt(grid.length) * 110;    // 110: width assigned to each cell
    
    const onChangeHandler = (event) => {
        const newGrid = [...grid];
        const index = event.target.placeholder - 1;
        let value = event.target.value;

        // set grid
        newGrid[index] = !isNaN(value) ? parseInt(value) : event.target.value;
        setGrid(newGrid);
    }

    const onBlurHandler = event => {
        let formula = event.target.value;
        
        //check the syntax of formula is correct: should contain sum:1,2,3
        if(formula.indexOf('sum:') > -1) {
            let cells = formula.split(':');
            let cellValues = cells[1].split(',');
            let calculatedValue = 0;
            
            cellValues.forEach((value) => {
                let inputValue = parseInt(value);
                if(inputValue) {
                    let input = !isNaN(grid[inputValue-1]) ? grid[inputValue-1] : 0;
                    
                    calculatedValue += Number(input);
                    event.target.value = calculatedValue;
                }
            });
        }
        //subscribe the change and update all subscribers
    };

    return (
        <div className='app'>
            <h2 className="header">Excel Sheet</h2>
            <div className="table" style={{width : tableWidth}}>
                {grid.map((square, index) => (
                    <input key={index} value={null} placeholder={index+1} onBlur={onBlurHandler} className="cell" onChange={onChangeHandler}></input>
                ))}
            </div>
        </div>
    )
}

export default Excel;