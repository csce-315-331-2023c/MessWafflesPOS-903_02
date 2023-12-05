import React, { useEffect, useState } from "react";
import "../FontSizing.css";

const FontSizing = () => {
    const [fontSize, setFontSize] = useState(false);

    const handleClick = () => {
        setFontSize(!fontSize)
    }

    useEffect(() => {
        if (fontSize === true) {
            document.body.classList.add("large");
        } else {
            document.body.classList.remove("large");
        }
    })

    return(
        <div>
            <button className="font-size" onClick={handleClick}> {fontSize?"Small":"Large"} </button>
        </div>
    );
}

export default FontSizing;
