import React from "react";
import icon from '../../static/icons/icons_undo.svg';

const UndoControl = (props: any) => {
    return (
        <div className="control">
            <button type='button' id='undo' className="iconbutton" disabled><img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default UndoControl;
