import React from "react";

const ScaleControl = (props: any) => {
    return (
        <div className="control">
            <label><span>Scale:</span>
                <input type='range' id='scale-range' min='5' max='100'/>
                <input type='text' className='object-control' id='scale-control' onFocus={(e) => {
                    e.target.value = ""
                }} min='0.1' max='3' step='0.1'/>
            </label>
        </div>
    );
}

export default ScaleControl;
