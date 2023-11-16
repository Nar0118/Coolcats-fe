import React from "react";

const ShowGridControl = (props: any) => {
    return (
        <div className="control">
            <label className='form-check-label'>
                Show:
                <input className='form-check-input' type='checkbox' id='show-grid'/>
            </label>
        </div>
    );
}

export default ShowGridControl;
