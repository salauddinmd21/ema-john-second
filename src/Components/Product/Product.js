import React from 'react';
import Cart from '../Cart/Cart';
import './Product.css'

const Product = (props) => {
    // console.log(props)
    const {name, img, price, seller, stock} =props.product
    return (
        <div className="single-product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h3>{name}</h3>
                <p><small>{seller}</small></p>
                <p>{price} </p>
                <p> Only{stock} left, Shop Now !!s</p>

                <button onClick={()=> props.handleAddProduct(props.product)} className='main-button'>add to cart</button>

            </div>
        </div>
    );
};

export default Product;