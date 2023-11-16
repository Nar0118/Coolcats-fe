import React from "react";

const RotationSnappingOption = (props: any) => {
    return (
        <div className="control">
            <label className='form-check-label'>
                Rotation snapping:
                <input className='form-check-input' type='checkbox' id='angle-snapping'/>
            </label>
        </div>
    );
}

export default RotationSnappingOption;
