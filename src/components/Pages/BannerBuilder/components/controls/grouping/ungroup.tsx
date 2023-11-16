import React from "react";
import icon from '../../static/icons/icons_ungroup.svg';

const UngroupControl = (props: any) => {
    return (
        <div className="control">
            <button type="button" id="ungroup" className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default UngroupControl;
