import React from "react";
import icon from '../../static/icons/icons_send to back.svg';

const SendToBack = (props: any) => {
    return (
        <div className="control">
            <button type='button' id='send-to-back' className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default SendToBack;
