import React from "react";
import icon from '../../static/icons/icons_send backward.svg';

const SendBackwards = (props: any) => {
    return (
        <div className="control">
            <button type='button' id='send-backwards' className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default SendBackwards;
