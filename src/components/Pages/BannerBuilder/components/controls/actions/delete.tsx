import React from "react";
import icon from '../../../../../../static/images/icons/times-white.svg';

const DeleteControl = (props: any) => {
    return (
        <div className="control">
            <button type='button' id='clear' className="delete-button iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default DeleteControl;
