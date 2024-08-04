import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryDesc from '../components/Categories/CategoryDesc';


const DynamicPage = () => {
  const { "*":slug } = useParams();
  const [title,setTitle] = useState(null)
  const [model, setModel] = useState(null);
  const [lookupId, setLookupId] = useState(null);

  useEffect(() => {

    const fetchRouteInfo = async () => {
      try {
        const response = await fetch(`https://api.santral.az/v1/routes/find?domain=santral_www&location=/${slug}`);
        const data = await response.json();
        const { lookupId, model,title } = data.route;
        setLookupId(lookupId);
        setModel(model);
        setTitle(title)
      } catch (error) {
        console.error('Error fetching route info:', error);
      }
    };

    fetchRouteInfo();
  }, [ slug]);

  if (!model || !lookupId) {
    return <p>Loading...</p>;
  }

  return <CategoryDesc title={title} lookupId={lookupId}  model={model}  slug={slug}/>;
};

export default DynamicPage;
