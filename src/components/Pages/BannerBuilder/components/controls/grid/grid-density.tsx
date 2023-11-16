import React from "react";

const GridDensityControl = (props: any) => {
    return (
        <div className="control">
            <label>
                <span>Density:</span>
                <input type='range' id='grid-range' min='5' max='100'/>
                <input type='text' className='object-control' id='grid-input' onFocus={(e) => {
                    e.target.value = ""
                }} min='0' max='89' step='1'/>
            </label>
        </div>
    );
}

export default GridDensityControl;
