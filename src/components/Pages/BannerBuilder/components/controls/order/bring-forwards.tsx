import React from "react";
import icon from '../../static/icons/icons_bring forward.svg';

const BringForwards = (props: any) => {
    return (
        <div className="control">
            <button type='button' id='bring-forwards' className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default BringForwards;
