import React from "react";
import FlipHorizontalControl from "./flip-horizontally";
import FlipVerticalControl from "./flip-vertically";

const FlipControls = (props: any) => {
    return (
        <>
            <FlipHorizontalControl />
            <FlipVerticalControl />
        </>
    );
}

export default FlipControls;
