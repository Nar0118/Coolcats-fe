import React from "react";

const SkewYControl = (props: any) => {
    return (
        <div className="control">
            <label>
                <span>SkewY:</span>
                <input type='range' id='skewY-range' min='-45' max='45'/>
                <input type='text' className='object-control' id='skewY-control' onFocus={(e) => {
                    e.target.value = ""
                }} min='0' max='89' step='1'/>
            </label>
        </div>
    );
}

export default SkewYControl;
