import React from "react";
import icon from '../../static/icons/icons_bring to front.svg';

const BringToFront = (props: any) => {
    return (
        <div className="control">
            <button type='button' id='bring-to-front' className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default BringToFront;
