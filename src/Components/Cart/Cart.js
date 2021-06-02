import React from 'react';

const Cart = (props) => {
    const cart = props.cart

    const total = cart.reduce((total,prd)=> total+prd.price ,0)
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total+ product.price
    // }
    let shiping =0 ;
    if (total>35) {
        shiping = 0;
    }
    else if (total> 15) {
        shiping = 4.99      
    }
     else if (total>0){
         shiping =12.99
     }

    const tax = total/10;
    const formatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision)
        }
        // const cartStyle = {
        //     textAlign: "center"
        // }
    return (
        <div  >
            <h3>Orderd Item : {cart.length}</h3>
            <p>Product Price: {formatNumber(total)}</p>
            <p>shipping: {formatNumber(shiping)}</p>
            <p><small>Tax: {formatNumber(tax)} </small></p>
            <h4>Grand Total {formatNumber(total + shiping+ tax)}</h4>
        </div>
    );
};

export default Cart;