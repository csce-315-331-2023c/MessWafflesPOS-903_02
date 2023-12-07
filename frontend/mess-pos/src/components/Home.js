// File: Home.js
// Home page for the website

import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Function: Home
// Returns the home page component, including the about section and weather widget
const Home = () => {
    function Script() {
        useEffect(() => {
            const script = document.createElement("script");
            script.src =
                "https://www.weatherapi.com/weather/widget.ashx?loc=2654732&wid=3&tu=2&div=weatherapi-weather-widget-3";
            script.async = true;
            var widget = document.getElementById("weatherapi-weather-widget-3");
            widget.appendChild(script);
            return () => {};
        }, []);
    }
    return (
        <div className="home-page">
            <Container>
                <h1 className="about-header">About Mess Waffles</h1>
                <Row>
                    <Col>
                        <div className="row mb-4">
                            <Image
                                src="https://cloudfront-us-east-1.images.arcpublishing.com/gray/MCO6C6ALLNMLDDBJHB7GV4OQW4.jpg"
                                fluid
                                alt="Picture of the Mess exterior"
                            />
                        </div>

                        <div>
                            <Image
                                src="https://images.squarespace-cdn.com/content/v1/5ad69812da02bc49e7489bbe/1680466719039-EFPFIL4K6HJKMUOB13N2/IMG_3038-1.jpg"
                                fluid
                                alt="Waffles image"
                            />
                        </div>
                    </Col>
                    <Col>
                        <p className="about-description">
                            Mess waffles is a creative comfort food destination
                            in College Station, texas. It was started by a
                            former Texas A&M student as a food truck in 2014,
                            and after much growth moved into a restaurant
                            location in College Station’s Century Square.{" "}
                        </p>
                        <Row>
                            <Image
                                src="https://images.squarespace-cdn.com/content/v1/5ad69812da02bc49e7489bbe/1590347742303-O632SK8DX7EQMFLP0INS/MessWaffles05-4.jpg"
                                fluid
                                alt="Mess chicken and waffles"
                            />
                        </Row>
                        <div className="row mt-4">
                            <Image
                                src="https://insitebrazosvalley.com/downloads/32303/download/unnamed-4.jpg?cb=57605109cf3f4d4dface7aef63f3e140&w=1200"
                                fluid
                                alt="a variety of mess food"
                            />
                        </div>
                        <div id="weatherapi-weather-widget-3">
                            <Script />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
