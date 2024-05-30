import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductInfo = () => {
  const { name } = useParams();
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://api.santral.az/v1/routes/find?domain=santral_www&location=/az/products/${name}`
        );
        const data = await response.json();
        setDescription(data.route);
      } catch (error) {
        console.error('Error fetching description:', error);
      }
    };

    fetchDescription();
  }, [name]);

  return (
    <div>
      <h2>Description:</h2>
      <img src={`https://cdn.santral.az/images/${description.thumbnail}`} alt="" />
      <p>{description?.title}</p>
    </div>
  );
}

export default ProductInfo;
