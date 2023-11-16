import React from "react";

const GridAlignmentControl = (props: any) => {
    return (
        <div className="control">
            <label>Alignment type:
                <select id='grid-snapping'>
                    <option defaultValue='none' value='none'>None</option>
                    <option defaultValue='hard' value='hard'>Hard</option>
                </select>
            </label>
        </div>
    );
}

export default GridAlignmentControl;
