import React, { useState, useEffect, useRef } from 'react';
import { useBaseUrl } from '../global/baseurlcontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Carousel() {
    const baseurl = useBaseUrl();
    const fetchUrl = `${baseurl}/product_api/banners.php`;

    const [banners, setBanners] = useState([]);
    const carouselRef = useRef(null);

    async function getBanners() {
        try {
            const result = await fetch(fetchUrl, { method: "GET", mode: "cors" });
            const data = await result.json();
            if (data.success === true) setBanners(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBanners();
    }, []);

    useEffect(() => {
        if (banners.length > 0 && carouselRef.current) {
            const bootstrap = require('bootstrap');
            new bootstrap.Carousel(carouselRef.current, {
                interval: 5000,
                ride: 'carousel'
            });
        }
    }, [banners]);

    return (
        <div
            id="carouselExampleIndicators"
            className="carousel slide mb-5"
            data-bs-ride="carousel"
            ref={carouselRef}
        >
            <div className="carousel-indicators">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="carousel-inner">
                {banners.map((item, index) => (
                    <div 
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        key={index}
                        >
                        <a href={item.url} target='_blank' rel="noreferrer">
                        <img
                            src={item.image_url}
                            className="d-block w-100"
                            alt={`Slide ${index + 1}`}
                            style={{ cursor: 'pointer' }}
                        />
                        </a>
                    </div>
                ))}
            </div>

            {/* Previous button */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            {/* Next button */}
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
