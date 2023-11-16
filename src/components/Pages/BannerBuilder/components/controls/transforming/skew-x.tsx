import React from "react";

const SkewXControl = (props: any) => {
    return (
        <div className="control">
            <label>
                <span>SkewX:</span>
                <input type='range' id='skewX-range' min='-45' max='45'/>
                <input type='text' className='object-control' id='skewX-control' onFocus={(e) => {
                    e.target.value = ""
                }} min='0' max='45' step='1'/>
            </label>
        </div>
    );
}

export default SkewXControl;
