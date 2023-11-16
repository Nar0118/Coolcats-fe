import React from "react";
import icon from '../../static/icons/icons_fill bg.svg';

const ChangeBackgroundColorControl = (props: any) => {
    return (
        <div className="control control--background-color">
            <label><img width="26" height="26" src={icon} />
                <input id='colour-picker' defaultValue='#FFFFFF' name='bg-colour'/>
            </label>
        </div>
    );
}

export default ChangeBackgroundColorControl;
