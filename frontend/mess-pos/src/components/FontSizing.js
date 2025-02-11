// File: FontSizing.js
// Provides functions for changing the font size of the website

import React, { useEffect, useState } from "react";
import "../FontSizing.css";

// Function: FontSizing
// Returns a button that toggles font size from large to small
const FontSizing = () => {
    // checking if localStorage is available
    const isLocalStorageAvailable = typeof localStorage !== "undefined";

    // retrieve previous (before refresh) font size
    const storedFontSize = isLocalStorageAvailable
        ? localStorage.getItem("fontSize")
        : null;
    const [fontSize, setFontSize] = useState(storedFontSize === "large");

    const handleClick = () => {
        const newFontSize = !fontSize;
        setFontSize(!fontSize);
        // store changed font size for refresh
        if (isLocalStorageAvailable) {
            localStorage.setItem("fontSize", newFontSize ? "large" : "small");
        }
    };

    useEffect(() => {
        // apply font size
        if (fontSize === true) {
            document.body.classList.add("large");
        } else {
            document.body.classList.remove("large");
        }
    }, [fontSize]); // avoids re-renders

    return (
        <div>
            <button className="font-size-button" onClick={handleClick}>
                {" "}
                {fontSize ? "ᴀA" : "ᴀA"}{" "}
            </button>
        </div>
    );
};

export default FontSizing;
