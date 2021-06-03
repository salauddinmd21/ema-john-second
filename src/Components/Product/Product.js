import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import './Product.css'

const Product = (props) => {
    // console.log(props)
    const {name, img, price, seller, stock,key} =props.product
    return (
        <div className="single-product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h3 className=".product-name"> <Link to = {'/product/'+key}>{name}</Link> </h3>
                <p><small>{seller}</small></p>
                <p>{price} </p>
                <p> Only{stock} left, Shop Now !!s</p>

               { props.showAddToCart && <button 
                onClick={()=> props.handleAddProduct(props.product)} className='main-button'>add to cart</button>}

            </div>
        </div>
    );
};

export default Product;