import React from "react";

const LeftControl = (props: any) => {
    return (
        <div className="control">
            <label>
                <span>Left:</span>
                <input type='text' className='object-control' id='left-control' onFocus={(e) => {
                    e.target.value = ""
                }} min='0' max='300'/>
            </label>
        </div>
    );
}

export default LeftControl;
