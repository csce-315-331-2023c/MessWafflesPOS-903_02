import React from "react";
import "../DarkMode.css";

const DarkMode = () => {
    let clickClass = "clicked";
    const body = document.body;
    const lightMode = "light";
    const darkMode = "dark";
    let theme;

    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    if (theme === darkMode || theme === lightMode) {
        body.classList.add(theme);
    } else {
        body.classList.add(lightMode);
    }

    const switchTheme = (e) => {
        if (theme === darkMode) {
            body.classList.replace(darkMode, lightMode);
            e.target.classList.remove(clickClass);
            localStorage.setItem("theme", "light");
            theme = lightMode;
        } else {
            body.classList.replace(lightMode, darkMode);
            e.target.classList.add(clickClass);
            localStorage.setItem("theme", "dark");
            theme = darkMode;
        }
    };

    return (
        <button
        className={theme === "dark" ? clickClass : ""}
        id="darkMode"
        onClick={(e) => switchTheme(e)}
        ></button>
    );
};

export default DarkMode;
