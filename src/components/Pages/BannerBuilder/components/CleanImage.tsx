import {loadImage, removeImageBackground} from "./scripts/bannerBuilder/utils";
import React, {useEffect, useState} from "react";

// @ts-ignore
export default function CleanImage({ source, onClick }) {
    const [src, setSrc] = useState(source);

    const cleanImage = async () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = canvas.height = 1080;
        const loadedImage = await loadImage(source);

        removeImageBackground(loadedImage, context);

        const newBase64 = canvas.toDataURL('image/png');
        setSrc(newBase64);
    }

    useEffect(() => {
        if (source) {
            cleanImage();
        }
    }, [source]);

    return <img src={src} onClick={onClick} />;
}
