import React from "react";

const ImageEdgeSnappingOption = (props: any) => {
    return (
        <div className="control">
            <label className='form-check-label'>
                Image Edge snapping:
                <input className='form-check-input' type='checkbox' id='edge-snapping'/>
            </label>
        </div>
    );
}

export default ImageEdgeSnappingOption;
