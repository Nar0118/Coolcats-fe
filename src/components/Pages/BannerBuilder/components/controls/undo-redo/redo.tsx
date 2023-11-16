import React from "react";
import icon from '../../static/icons/icons_redo.svg';

const RedoControl = (props: any) => {
    return (
        <div className="control">
            <button type='button' id='redo' className="iconbutton" disabled><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default RedoControl;
