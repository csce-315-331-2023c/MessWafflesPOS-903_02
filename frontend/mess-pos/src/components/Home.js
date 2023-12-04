import React, { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;

        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
                { pageLanguage: "en" },
                "google_translate_element"
            );
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div id="google_translate_element"></div>
            <div>Home</div>
        </div>
    );
};

export default Home;
