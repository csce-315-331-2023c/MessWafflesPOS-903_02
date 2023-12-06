import React, { useEffect, useState } from "react";
import "../DarkMode.css";

const DarkMode = () => {
    // checking if localStorage is available
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';

    // retrieve previous (before refresh) theme
    const storedTheme = isLocalStorageAvailable ? localStorage.getItem('theme') : null;
    const [theme, setTheme] = useState(storedTheme === 'dark');

    const handleClick = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        // store changed theme for refresh
        if (isLocalStorageAvailable) {
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        }
    }

    useEffect(() => {
        // apply theme
        if (theme) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]); // avoids re-renders

    return (
        <div>
            <button className="dm-button" onClick={handleClick}> {theme ? "Dark 🌙" : "Light ☀"} </button>
        </div>
    );
}

export default DarkMode;
