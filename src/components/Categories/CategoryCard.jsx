// src/components/CategoryCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
    const { id, title, cover, route } = category;

    return (
        <div className='max-w-[116px]'>
            <Link to={`/category${route}`} className='flex items-center flex-col'>
                <img className='w-[116px] rounded-[8px] drop-shadow-md bg-white' src={`https://cdn.santral.az//images/${cover}`} alt={title} />
                <p className='text-center my-[8px]'>{title}</p>
            </Link>
        </div>
    );
}

export default CategoryCard;
