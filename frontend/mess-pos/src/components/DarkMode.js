import React from "react";
import "../DarkMode.css";

const DarkMode = () => {
    let clickClass = "clicked";
    const body = document.body;
    const lightMode = "light";
    const darkMode = "dark";
    let theme;

    // storing current theme
    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    // current theme check
    if (theme === darkMode || theme === lightMode) {
        body.classList.add(theme);
    } else {
        body.classList.add(lightMode);
    }

    // const applyBackgroundTheme = (selectedTheme) => {
    //     // background elements
    //     const backgroundElements = document.querySelectorAll(".background-element");
    //     backgroundElements.forEach((element) => {
    //         element.classList.add(selectedTheme);
    //     });
    // };

    const switchTheme = (e) => {
        if (theme === darkMode) {
            body.classList.replace(darkMode, lightMode);
            // applyBackgroundTheme(lightMode);
            e.target.classList.remove(clickClass);
            localStorage.setItem("theme", "light");
            theme = lightMode;
        } else {
            body.classList.replace(lightMode, darkMode);
            // applyBackgroundTheme(darkMode);
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
/*
function toggle_style() {
    // get page
    element = document.getElementById("mainStyle");

    // get style of page
    style = element.getAttribute("href");

    // new style
    if (style == "original_style.css") {
        element.setAttribute("href", "aggie_style.css");
    } else {
        element.setAttribute("href", "original_style.css");
    }

    // for refresh
    localStorage.setItem("savedStyle", element.getAttribute("href"));
}


window.onload = function() {
    // retrieve style before refresh
    localStyleSheet = localStorage.getItem("savedStyle");

    // get html style element by id (as before)
    element = document.getElementById("mainStyle");

    // replace href
    element.setAttribute("href", localStyleSheet);
}
*/
