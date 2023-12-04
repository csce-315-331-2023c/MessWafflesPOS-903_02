import React, { useEffect } from "react";

export const TranslateElement = () => {
    return (
        <div id="google_translate_element" style={{ display: "none" }}></div>
    );
};

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
                    layout: window.google.translate.TranslateElement
                        .InlineLayout.SIMPLE,
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
