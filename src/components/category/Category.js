 import React from 'react'
import './Category.scss';
import { useNavigate } from 'react-router-dom';

function Category({category}) {

  console.log('category',category);
  const navigate = useNavigate();
  
  return (
    <div className="Category" 
    // style={{backgroundImage: `url(${category.attributes.image.data.attributes.url})`}}
     onClick={() => navigate(`/category/${category.attributes.key}`)}>
    
      <div className="catgory-content">
        {/* //fetch categories from backend */}
        <h1 className='heading'>{category.attributes.title}</h1>
        </div>
    </div>
  )
}

export default Category

//style={{backgroundImage: `url(${category.attributes.image.data.attributes.url})`}}
    //style={{backgroundImage: `url(${category?.attributes.image.data.attributes.url})`}}

    //ERROR