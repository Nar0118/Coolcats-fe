import React from "react";

const AngleControl = (props: any) => {
    return (
        <div className="control">
            <label>
                <span>Angle:</span>
                <input id='angle-range' type='range' min='0' max='360'/>
                <input type='text' className='object-control' id='angle-control' onFocus={(e) => {
                    e.target.value = ""
                }} min='0' max='360'/>
            </label>
        </div>
    );
}

export default AngleControl;
