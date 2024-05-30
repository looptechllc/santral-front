import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/headerlogo.svg';
import call from '../../assets/call.svg';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const language = 'en';

    useEffect(() => {
        fetch('https://api.santral.az/v1/categories/mobile?lang=az', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCategories(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setLoading(false);
            });
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className='w-full bg-[#FFD23F] p-[16px]'>
                <div className='w-[95%] mx-auto flex items-center justify-between text-black/90'>
                    <Link to="/"><img src={logo} alt="logo.svg" /></Link>
                    <div className='flex items-center gap-[100px] font-light'>
                        <Link to="/about">Haqqımızda</Link>
                        <Link to="/filliallar">Filiallar</Link>
                        <Link to="/kampaniyalar">Kampaniyalar</Link>
                        <Link to="/partners">Partnyorlar</Link>
                    </div>
                    <div className='flex items-center gap-[16px]'>
                        <a href='tel:1410' className='flex items-center gap-[8px]'>
                            <img src={call} alt="" />
                            1410
                        </a>
                        <button className='bg-black rounded-[32px] px-[24px] py-[16px] text-white'>Daxil ol</button>
                        <select name="" id="" className='bg-transparent'>
                            <option value="">Az</option>
                            <option value="">En</option>
                            <option value="">Ru</option>
                        </select>
                    </div>
                </div>
            </div>
            <Container>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <div className='flex'>
                        <div className='w-1/4'>
                            {categories.map((category) => (
                                <CategoryAccordion
                                    key={category.id}
                                    category={category}
                                    language={language}
                                    onCategorySelect={handleCategorySelect}
                                    isSelected={selectedCategory && selectedCategory.id === category.id}
                                />
                            ))}
                        </div>
                        <div className='w-3/4 p-4 grid grid-cols-3 place-content-start gap-4'>
                            {selectedCategory && selectedCategory.children.map((child) => (
                                <CategoryAccordion isExpanded={true} key={child.id} category={child} language={language} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};

export default Header;

const CategoryAccordion = ({ category, language, onCategorySelect, isSelected,isExpanded }) => {
    const [expanded, setExpanded] = useState(isExpanded);

    const handleChange = () => {
        setExpanded(!expanded);
        onCategorySelect(category);
    };

    const getTranslation = (translations) => {
        const translation = translations.find((t) => t.language === language);
        return translation ? translation.title : '';
    };

    return (
        <Accordion expanded={isSelected || expanded} onChange={handleChange} className='w-full'>
            {category.children?.length>0?<AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{category.title}</Typography>
            </AccordionSummary>:<Link to={`/category/${category.id}`}>{category.title}</Link>}
            <AccordionDetails className='flex flex-col'>
                {category.children.map((child) => (
                    <Link to={`/category/${child.id}`}>{child.title}</Link>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

const CategoryGrid = ({ category, language }) => {
    

    return (
        <div className='border border-gray-300 p-2 text-center rounded bg-gray-50'>
            <Link to={`/category/${category.id}`}>{category.title}</Link>
        </div>
    );
};
