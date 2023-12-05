import React, { useEffect, useState } from "react";
import "../DarkMode.css";

const DarkMode = () => {
    const [theme, setTheme] = useState(false);
    // const [theme, setTheme] = localStorage.getItem('theme');

    const handleClick = () => {
        setTheme(!theme)
    }

    useEffect(() => {
        if (theme === true) {
            document.body.classList.add("dark");
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove("dark");
        }
    })

    return(
        <div>
            <button className="dm-button" onClick={handleClick}> {theme?"Light":"Dark"} </button>
        </div>
    );
}

export default DarkMode;

// import React from "react";
// import "../DarkMode.css";

// const DarkMode = () => {
//     const darkButton = document.getElementById('dark');
//     const lightButton = document.getElementById('light');
//     const body = document.body;

//     let clickClass = "clicked";

//     const theme = localStorage.getItem('theme');

//     if (theme) {
//         body.classList.add(theme);
//     }

//     // Button Event Handlers

//     const switchTheme = (e) => {
//         window.onload = function() { 
//             darkButton.onclick = () => {
//                 body.classList.replace('light', 'dark');
//                 localStorage.setItem('theme', 'dark');
//             };
        
//             lightButton.onclick = () => {
//                 body.classList.replace('dark', 'light');
        
//                 localStorage.setItem('theme', 'light');
//             };
//         };
//     }


//     return (
//         <button
//         className={theme === "dark" ? clickClass : ""}
//         id="darkMode"
//         onClick={() => switchTheme()}
//         ></button>
//     );
// };

// export default DarkMode;

/*
let clickClass = "clicked";
const body = document.body;
const test = document.getElementsByClassName("");
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
*/


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
