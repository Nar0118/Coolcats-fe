import React from "react";
import icon from '../../static/icons/icons_group.svg';

const GroupControl = (props: any) => {
    return (
        <div className="control">
            <button type="button" id="group" className="iconbutton"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default GroupControl;
