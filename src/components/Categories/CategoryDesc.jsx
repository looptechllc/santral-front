// src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ElementCard from '../General/ElementCard';

function CategoryDesc() {
    const { id } = useParams(); 
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [itemCount,setItemCount] = useState(0);
    const [filters, setFilters] = useState({}); // State to store selected filter options
    const [filterOptions, setFilterOptions] = useState([]);
    useEffect(() => {
        fetchFilters();
    }, [id]);
    useEffect(() => {
        fetch(`https://api.santral.az/v1/products/mobile?category=${id}&limit=10&lang=az&page=${currentPage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
                console.log(data)
                setTotalPages(data.pagination.pages); 
                setItemCount(data.pagination.count)
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [id, currentPage,filters]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const fetchFilters = () => {
        fetch(`https://api.santral.az/v1/products/mobile?filters=1&category=${id}&lang=az`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => setFilterOptions(data.data))
            .catch(error => console.error('Error fetching filters:', error));
    };
    const handleFilterChange = (filterId, optionId) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterId]: optionId
        }));
    };
    return (
        <div className='my-24 bg-white'>
            <h1 className='text-[48px] font-bold'>Category {id} <span className='text-black/40 text-[24px] font-medium'>({itemCount} məhsul)</span></h1>
            <div className='flex flex-wrap gap-4'>

                {filterOptions.map(filter => (
                    <div key={filter.id}>
                        <h2>{filter.title}</h2>
                        <ul>
                            {filter.options.map(option => (
                                <li key={option.id}>
                                    <input
                                        type='checkbox'
                                        id={option.id}
                                        checked={filters[filter.id] === option.id}
                                        onChange={() => handleFilterChange(filter.id, option.id)}
                                    />
                                    <label htmlFor={option.id}>{option.title} ({option.count})</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {products.map((product, index) => (
                    <ElementCard
                        key={index}
                        img={`https://cdn.santral.az//images/${product.thumbnail}`}
                        name={product.title}
                        price={product.price}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default CategoryDesc;




function Pagination({ currentPage, totalPages, onPageChange }) {
    const pagesToShow = 10; // Number of pages to show
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2)); // Calculate start page
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1); // Calculate end page

    const pages = [...Array(endPage - startPage + 1).keys()].map(number => startPage + number);

    return (
        <div className='flex items-center justify-center'>
            <button
                className={`pagination-arrow ${currentPage === 1 ? 'hidden' : ''} rounded-full w-[40px] h-[40px] mx-[4px] border border-[#EAEAEA] flex items-center justify-center p-2 bg-white hover:bg-yellow-200 transition-colors`}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {'<'}
            </button>
            <div className='pagination'>
                {pages.map(page => (
                    <button
                        key={page}
                        className={`pagination-button ${page === currentPage ? 'active bg-[#FFD23F] border-[#ffd23f]' : 'border-[#EAEAEA] '} rounded-full w-[40px] h-[40px] mx-[4px] border  p-2  transition-colors`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                className={`pagination-arrow ${currentPage === totalPages ? 'hidden' : ''} rounded-full w-[40px] h-[40px] mx-[4px] border border-[#EAEAEA]  p-2 bg-white hover:bg-yellow-200 transition-colors`}
                onClick={() => onPageChange(currentPage + 1)}
            >
                {'>'}
            </button>
        </div>
    );
}




