import React from "react";
import icon from '../../static/icons/icons_deselect all.svg';

const DeselectControl = (props: any) => {
    return (
        <div className="control">
            <button type="button" id="deselect" className="iconbutton iconbutton--text"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default DeselectControl;
