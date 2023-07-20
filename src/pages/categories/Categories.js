import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from "react-router-dom"
import './Categories.scss';
import Product from '../../components/product/Product';
import { axiosClient } from '../../utils/axiosClient';


function Categories() {
    const navigate= useNavigate();
    const params = useParams();

    const [categoryId, setCategoryId] = useState('');
   const categories = useSelector((state) => state.categoryReducer.categories);
   const [products, setProducts] = useState([]);
   
   const categoryList = [{
    id: "comics",
    value: 'Comics'
},
{
    id: "tv-shows",
    value: 'TV Shows'
},
{
    id: "sports",
    value: 'Sports'
},
];
   const sortOptions = [{
   
    value: 'Price- Low  to High',
    sort: 'price'
}, {
    
    value: 'Newest First',
    sort:'createdAt'
}
];

const [sortBy, setSortBy] =useState(sortOptions[0].sort);

    async function fetchProducts() {
        const url = params.categoryId ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`:
        `/products?populate=image&sort=${sortBy}`;

        const response = await axiosClient.get(url);
        // console.log(response.data.data);
        setProducts(response.data.data);
    }

//provides us category id
useEffect(() =>{
    setCategoryId(params.categoryId);
    fetchProducts();
    //api call 
},[params,sortBy]) //on updating params

// on clicking any of the 3 options this fiunction will be called and 
// it will direct to that particular page inside category 
  function updateCategory(e)
  {
    navigate(`/category/${e.target.value}`);
    
  }

  return (
    <div className='Categories'>
        <div className="container">
        <div className="header">
            <div className="info">
                <h2>Explore All Print and Artwork</h2>
                <p>India's largest collection of wall posters for you</p>
            </div>
            <div className="sort-by">
                <div className="sort-by-container">
                    <h3 className="sort-by-text">Sort By</h3>
                    <select className='select-sort-by' name="sort-by" id="sort-by"
                    //changes on different sorting 
                    onChange={(e) => setSortBy(e.target.key)}>
                        {sortOptions.map(item => <option key={item.sort} value={item.sort}>{item.value}</option>)}


                        {/* <option value="relevence">Relevence</option>
                        <option value="newest-first">Newest First</option>
                        <option value="price-lth">Price- Low To High</option> */}
                    </select>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="filter-box">
                <div className="category-filter">
                    <h3>Category</h3>

                    {categoryList.map((item) => (
                    <div key={item.id} className="filter-radio">
                        <input 
                               name="category"
                               type="radio" 
                               value={item.id}
                               id= {item.id}
                               onChange={updateCategory}

                               checked={item.id === categoryId}
                               //if a specific category is typed and opened, the category itseld gets 
                               //selected in the box  
                               />
                        <label htmlFor={item.id}>{item.value}</label>
                    </div>
                    ))}

                    
                </div>
            </div>
            <div className="product-box">
                {products.map(product => <Product  key={product.id} product={product}/>)}
                {/* <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/> */}

            </div>
        </div>

        </div>
        
    </div>
  )
}

export default Categories