import React from "react";
import icon from '../../static/icons/icons_download.svg';

const DownloadControl = (props: any) => {
    return (
        <div className="control create-banner-button">
            <button type='button' id='download' className="iconbutton">Create Banner <img width="26" height="26" src={icon} /></button>
        </div>
    );
}

export default DownloadControl;
