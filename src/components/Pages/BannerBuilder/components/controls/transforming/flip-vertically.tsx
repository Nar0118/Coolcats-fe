import React from "react";
import icon from '../../static/icons/icons_slip vertical.svg';

const FlipVerticalControl = (props: any) => {
    return (
        <div className="control">
            <button type="button" id="flip-y" className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default FlipVerticalControl;
