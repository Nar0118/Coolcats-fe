import React from "react";

const ToggleDarkModeOption = (props: any) => {
    return (
        <div className="control">
            <label className='toggle-lighting'>
                <input type='checkbox' id='hidden-dark'/>
                <span className='slider round darken'></span>
            </label>
            <span id='dark-label'>Toggle Dark Mode</span>
        </div>
    );
}

export default ToggleDarkModeOption;
