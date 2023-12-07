// File: translate.js
// Provides functions for translating the website

import React, { useEffect } from "react";

// Function: TranslateElement
// Returns a div element with the Google Translate widget
export const TranslateElement = () => {
    return <div id="google_translate_element"></div>;
};

// Function: TranslateScript
// Returns a useEffect function with the Google Translate script to translate the website
export const TranslateScript = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    layout: window.google.translate.TranslateElement,
                },
                "google_translate_element"
            );
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};
