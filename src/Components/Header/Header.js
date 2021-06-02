import React from 'react';
import Logo from '../../images/logo.png'
import "./Header.css"

const Header = () => {
    return (
        <div className ='header'>
            <div className ='logo'>
                <img src={Logo} alt="" />
            </div>
            <div>
                <nav className='main-menu'>
                    <a href="/shop">Shop</a>
                    <a href="/review"> Review Order</a>
                    <a href="/inventory">Manage Inventory</a>
                </nav>

            </div>
        </div>
    );
};

export default Header;