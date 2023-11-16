import React from "react";
import icon from '../../static/icons/icons_select all.svg';

const SelectAllControl = (props: any) => {
    return (
        <div className="control">
            <button type="button" id="select-all" className="iconbutton iconbutton--text"><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default SelectAllControl;
