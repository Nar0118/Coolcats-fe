import React from "react";

const TopControl = (props: any) => {
    return (
        <div className="control">
            <label><span>Top:</span><input type='text' className='object-control' id='top-control' onFocus={(e) => {
                e.target.value = ""
            }} min='0' max='300'/></label>
        </div>
    );
}

export default TopControl;
