import React from "react";
import icon from '../../static/icons/icons_flip horizontal.svg';

const FlipHorizontalControl = (props: any) => {
    return (
        <div className="control">
            <button type="button" id="flip-x" className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default FlipHorizontalControl;
