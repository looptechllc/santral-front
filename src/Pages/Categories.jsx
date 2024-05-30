// src/pages/Categories.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CategoryCard from '../components/Categories/CategoryCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://api.santral.az/v1/categories/mobile?lang=az', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => setCategories(data.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        arrows:false,
        speed: 2000,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Adjust the speed as needed (3000ms = 3 seconds)
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 3000
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    autoplay: true,
                    autoplaySpeed: 3000
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000
                }
            }
        ]
    };

    return (
        <div className='my-24 container mx-auto'>
            <Slider {...settings}>
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </Slider>
        </div>
    );
}

export default Categories;
