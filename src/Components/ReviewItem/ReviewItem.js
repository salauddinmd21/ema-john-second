import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,key, price} = props.product ;
    const reviewItemStyle = {
        borderBottom:'1px solid grey',
        marginLeft:'150px',
        padding:'5px'
    }
    return (
        <div style={reviewItemStyle}>
           <h4 className='product-name'>{name}</h4>
           <p> {quantity}</p>
           <p>$ {price}</p>
           <button className='main-button'
           onClick={()=>props.removeProduct(key)}
           >remove</button>
        </div>
    );
};

export default ReviewItem;